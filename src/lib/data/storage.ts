import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { IProjectImage } from "@/types/project";

type Bucket = "project-images" | "assets";

function sanitize(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const ext = dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
  const base = (dot >= 0 ? fileName.slice(0, dot) : fileName)
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const stamp = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  return `${base || "file"}-${stamp}${ext}`;
}

// Uploads a file and returns its public URL + storage path.
export async function uploadImage(
  bucket: Bucket,
  folder: string,
  file: File
): Promise<IProjectImage> {
  const path = `${folder}/${sanitize(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) throw new Error(`uploadImage failed: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteImages(
  bucket: Bucket,
  paths: string[]
): Promise<void> {
  if (paths.length === 0) return;
  const { error } = await supabaseAdmin.storage.from(bucket).remove(paths);
  // Don't hard-fail a delete over storage cleanup — log and continue.
  if (error) console.error(`deleteImages warning: ${error.message}`);
}
