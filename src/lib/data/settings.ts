import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ISiteSettings } from "@/types/project";

interface SettingsRow {
  full_name: string;
  role_label: string;
  hero_intro: string;
  about_bio: string;
  instagram_url: string;
  instagram_handle: string;
  email: string;
  avatar_url: string | null;
  hero_bg_url: string | null;
  cv_url: string | null;
}

const SELECT_COLUMNS =
  "full_name, role_label, hero_intro, about_bio, instagram_url, instagram_handle, email, avatar_url, hero_bg_url, cv_url";

const EMPTY_SETTINGS: ISiteSettings = {
  fullName: "",
  roleLabel: "",
  heroIntro: "",
  aboutBio: "",
  instagramUrl: "",
  instagramHandle: "",
  email: "",
  avatarUrl: "",
  heroBgUrl: "",
  cvUrl: "",
};

function rowToSettings(row: SettingsRow): ISiteSettings {
  return {
    fullName: row.full_name,
    roleLabel: row.role_label,
    heroIntro: row.hero_intro,
    aboutBio: row.about_bio,
    instagramUrl: row.instagram_url,
    instagramHandle: row.instagram_handle,
    email: row.email,
    avatarUrl: row.avatar_url ?? "",
    heroBgUrl: row.hero_bg_url ?? "",
    cvUrl: row.cv_url ?? "",
  };
}

export async function getSettings(): Promise<ISiteSettings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select(SELECT_COLUMNS)
    .eq("id", 1)
    .maybeSingle();

  if (error) throw new Error(`getSettings failed: ${error.message}`);
  return data ? rowToSettings(data as SettingsRow) : EMPTY_SETTINGS;
}

// Partial update — only the provided fields are written (assets are uploaded
// separately and passed in as URLs).
export async function updateSettings(
  patch: Partial<ISiteSettings>
): Promise<ISiteSettings> {
  const row: Record<string, string> = {};
  if (patch.fullName !== undefined) row.full_name = patch.fullName;
  if (patch.roleLabel !== undefined) row.role_label = patch.roleLabel;
  if (patch.heroIntro !== undefined) row.hero_intro = patch.heroIntro;
  if (patch.aboutBio !== undefined) row.about_bio = patch.aboutBio;
  if (patch.instagramUrl !== undefined) row.instagram_url = patch.instagramUrl;
  if (patch.instagramHandle !== undefined)
    row.instagram_handle = patch.instagramHandle;
  if (patch.email !== undefined) row.email = patch.email;
  if (patch.avatarUrl !== undefined) row.avatar_url = patch.avatarUrl;
  if (patch.heroBgUrl !== undefined) row.hero_bg_url = patch.heroBgUrl;
  if (patch.cvUrl !== undefined) row.cv_url = patch.cvUrl;

  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .update(row)
    .eq("id", 1)
    .select(SELECT_COLUMNS)
    .single();

  if (error) throw new Error(`updateSettings failed: ${error.message}`);
  return rowToSettings(data as SettingsRow);
}
