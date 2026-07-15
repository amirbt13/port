import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { deleteImages } from "@/lib/data/storage";
import { IProject, IProjectImage } from "@/types/project";

// Shape of a row in the `projects` table (snake_case DB columns).
interface ProjectRow {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  city: string;
  date_year: string;
  date_month: string;
  images: IProjectImage[] | null;
  cover_url: string | null;
  sort_order: number;
}

function rowToProject(row: ProjectRow): IProject {
  const images = row.images ?? [];
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    images,
    cover_url: row.cover_url ?? images[0]?.url ?? "",
    city: row.city,
    dateYear: row.date_year,
    dateMonth: row.date_month,
    sortOrder: row.sort_order,
  };
}

const SELECT_COLUMNS =
  "id, name, title, subtitle, description, city, date_year, date_month, images, cover_url, sort_order";

// -------------------- reads (public, anon key) --------------------

export async function getProjects(): Promise<IProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(`getProjects failed: ${error.message}`);
  return (data as ProjectRow[]).map(rowToProject);
}

export async function getProjectById(id: string): Promise<IProject | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(SELECT_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`getProjectById failed: ${error.message}`);
  return data ? rowToProject(data as ProjectRow) : null;
}

// Matches the existing /projects/{city}/{year}/{month}/{title} route.
export async function getProjectByRouteParams(
  city: string,
  year: string,
  month: string,
  title: string
): Promise<IProject | null> {
  const projects = await getProjects();
  const dec = (s: string) => decodeURIComponent(s).toLowerCase();
  return (
    projects.find(
      (p) =>
        p.city.toLowerCase() === dec(city) &&
        p.dateYear.toLowerCase() === dec(year) &&
        p.dateMonth.toLowerCase() === dec(month) &&
        p.title.toLowerCase() === dec(title)
    ) ?? null
  );
}

// -------------------- writes (service role) --------------------

export interface ProjectInput {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  city: string;
  dateYear: string;
  dateMonth: string;
  images: IProjectImage[];
  cover_url: string;
  sortOrder: number;
}

function inputToRow(input: ProjectInput) {
  return {
    name: input.name,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    city: input.city,
    date_year: input.dateYear,
    date_month: input.dateMonth,
    images: input.images,
    cover_url: input.cover_url || input.images[0]?.url || null,
    sort_order: input.sortOrder,
  };
}

export async function createProject(input: ProjectInput): Promise<IProject> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert(inputToRow(input))
    .select(SELECT_COLUMNS)
    .single();

  if (error) throw new Error(`createProject failed: ${error.message}`);
  return rowToProject(data as ProjectRow);
}

export async function updateProject(
  id: string,
  input: ProjectInput
): Promise<IProject> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(inputToRow(input))
    .eq("id", id)
    .select(SELECT_COLUMNS)
    .single();

  if (error) throw new Error(`updateProject failed: ${error.message}`);
  return rowToProject(data as ProjectRow);
}

export async function deleteProject(id: string): Promise<void> {
  // Remove the stored images first so we don't orphan files in the bucket.
  const project = await getProjectById(id);
  if (project && project.images.length > 0) {
    await deleteImages(
      "project-images",
      project.images.map((img) => img.path)
    );
  }

  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) throw new Error(`deleteProject failed: ${error.message}`);
}
