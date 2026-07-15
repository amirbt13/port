"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
  ProjectInput,
} from "@/lib/data/projects";
import { getSettings, updateSettings } from "@/lib/data/settings";
import { uploadImage, deleteImages } from "@/lib/data/storage";
import { IProjectImage } from "@/types/project";

export interface ActionState {
  error?: string;
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/about-me");
}

const projectSchema = z.object({
  name: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string(),
  description: z.string(),
  city: z.string(),
  dateYear: z.string(),
  dateMonth: z.string(),
  sortOrder: z.coerce.number().int().default(0),
});

// Reads text fields, uploads new files, keeps selected existing images, and
// returns a ProjectInput ready for the data layer.
async function buildProjectInput(formData: FormData): Promise<ProjectInput> {
  const parsed = projectSchema.safeParse({
    name: (formData.get("name") as string) || slugify(formData.get("title") as string),
    title: formData.get("title"),
    subtitle: formData.get("subtitle") ?? "",
    description: formData.get("description") ?? "",
    city: formData.get("city") ?? "",
    dateYear: formData.get("dateYear") ?? "",
    dateMonth: formData.get("dateMonth") ?? "",
    sortOrder: formData.get("sortOrder") ?? 0,
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
  }
  const fields = parsed.data;
  const folder = slugify(fields.name);

  // Images the user kept (edit form passes these back as JSON).
  let keptImages: IProjectImage[] = [];
  const existingRaw = formData.get("existingImages");
  if (typeof existingRaw === "string" && existingRaw.trim()) {
    try {
      keptImages = JSON.parse(existingRaw) as IProjectImage[];
    } catch {
      keptImages = [];
    }
  }

  // Newly uploaded files.
  const files = formData
    .getAll("newImages")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const uploaded = await Promise.all(
    files.map((file) => uploadImage("project-images", folder, file))
  );

  const images = [...keptImages, ...uploaded];

  // Cover: use the posted cover_url if it still points to a kept image,
  // otherwise fall back to the first image.
  const requestedCover = (formData.get("cover_url") as string) || "";
  const cover_url =
    images.find((img) => img.url === requestedCover)?.url ??
    images[0]?.url ??
    "";

  return {
    name: folder,
    title: fields.title,
    subtitle: fields.subtitle,
    description: fields.description,
    city: fields.city,
    dateYear: fields.dateYear,
    dateMonth: fields.dateMonth,
    images,
    cover_url,
    sortOrder: fields.sortOrder,
  };
}

export async function createProjectAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  try {
    const input = await buildProjectInput(formData);
    await createProject(input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create project" };
  }
  revalidatePublic();
  redirect("/admin");
}

export async function updateProjectAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (!id) return { error: "Missing project id" };
  try {
    const existing = await getProjectById(id);
    const input = await buildProjectInput(formData);

    // Delete images that were removed in the form from storage.
    if (existing) {
      const keptPaths = new Set(input.images.map((img) => img.path));
      const removed = existing.images
        .filter((img) => !keptPaths.has(img.path))
        .map((img) => img.path);
      if (removed.length) await deleteImages("project-images", removed);
    }

    await updateProject(id, input);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update project" };
  }
  revalidatePublic();
  redirect("/admin");
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = formData.get("id") as string;
  if (id) {
    await deleteProject(id);
    revalidatePublic();
  }
  redirect("/admin");
}

// -------------------- settings --------------------

const settingsSchema = z.object({
  fullName: z.string(),
  roleLabel: z.string(),
  heroIntro: z.string(),
  aboutBio: z.string(),
  instagramUrl: z.string(),
  instagramHandle: z.string(),
  email: z.string(),
});

async function maybeUpload(
  formData: FormData,
  field: string
): Promise<string | undefined> {
  const file = formData.get(field);
  if (file instanceof File && file.size > 0) {
    const { url } = await uploadImage("assets", "site", file);
    return url;
  }
  return undefined;
}

export async function updateSettingsAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  try {
    const parsed = settingsSchema.safeParse({
      fullName: formData.get("fullName") ?? "",
      roleLabel: formData.get("roleLabel") ?? "",
      heroIntro: formData.get("heroIntro") ?? "",
      aboutBio: formData.get("aboutBio") ?? "",
      instagramUrl: formData.get("instagramUrl") ?? "",
      instagramHandle: formData.get("instagramHandle") ?? "",
      email: formData.get("email") ?? "",
    });
    if (!parsed.success) {
      return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    // Upload any replaced assets; keep existing URLs when no new file is sent.
    const current = await getSettings();
    const avatarUrl = (await maybeUpload(formData, "avatar")) ?? current.avatarUrl;
    const heroBgUrl = (await maybeUpload(formData, "heroBg")) ?? current.heroBgUrl;
    const cvUrl = (await maybeUpload(formData, "cv")) ?? current.cvUrl;

    await updateSettings({ ...parsed.data, avatarUrl, heroBgUrl, cvUrl });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update settings" };
  }
  revalidatePublic();
  redirect("/admin");
}
