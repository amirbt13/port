// One-time migration: seed Supabase from the existing static content.
// Run locally AFTER creating the buckets/tables (supabase/schema.sql) and
// filling .env.local:  npm run migrate
//
// Safe to re-run: it clears the `projects` table and re-uploads. It does NOT
// delete existing storage files, so re-running creates new file names.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import path from "node:path";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Fill .env.local."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");

interface OldProject {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrls: string[];
  cover: string;
  city: string;
  dateYear: string;
  dateMonth: string;
}

function contentType(file: string): string {
  const ext = path.extname(file).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".pdf") return "application/pdf";
  return "application/octet-stream";
}

async function uploadFile(
  bucket: string,
  storagePath: string,
  absPath: string
): Promise<string> {
  const buffer = readFileSync(absPath);
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, buffer, {
      contentType: contentType(absPath),
      upsert: true,
    });
  if (error) throw new Error(`upload ${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function migrateProjects() {
  const raw = readFileSync(
    path.join(ROOT, "src/data/staticData.json"),
    "utf-8"
  );
  const projects = JSON.parse(raw) as OldProject[];

  console.log("Clearing existing projects…");
  await supabase.from("projects").delete().neq("name", "__none__");

  for (const p of projects) {
    console.log(`Uploading images for "${p.name}"…`);
    const images: { url: string; path: string; orig: string }[] = [];
    for (const n of p.imageUrls) {
      const abs = path.join(PUBLIC, "images", p.name, `${n}.jpg`);
      const storagePath = `${p.name}/${n}.jpg`;
      const url = await uploadFile("project-images", storagePath, abs);
      images.push({ url, path: storagePath, orig: n });
    }
    const cover = images.find((i) => i.orig === p.cover) ?? images[0];

    const { error } = await supabase.from("projects").insert({
      name: p.name,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      city: p.city,
      date_year: p.dateYear,
      date_month: p.dateMonth,
      images: images.map(({ url, path }) => ({ url, path })),
      cover_url: cover?.url ?? null,
      sort_order: p.id,
    });
    if (error) throw new Error(`insert ${p.name}: ${error.message}`);
    console.log(`  ✓ ${p.title}`);
  }
}

async function migrateSettings() {
  console.log("Uploading site assets…");
  const avatarUrl = await uploadFile(
    "assets",
    "site/avatar.jpg",
    path.join(PUBLIC, "images", "avatar.jpg")
  );
  const heroBgUrl = await uploadFile(
    "assets",
    "site/hero-bg.jpg",
    path.join(PUBLIC, "images", "afra", "2.jpg")
  );
  const cvUrl = await uploadFile(
    "assets",
    "site/cv.pdf",
    path.join(PUBLIC, "narjes_ghaffari_resume.pdf")
  );

  const heroIntro =
    "In this collection, you witness the precise intersection of concept, functionality, and aesthetics — where each project reflects a commitment to quality, innovation, and respect for the surrounding environment. I hope this portfolio conveys my professional vision and capabilities in creating sustainable and enduring spaces.";

  const aboutBio = `سلام،
من نرجس غفاری هستم، متولد پاییز ۱۳۷۸ در تهران. علاقه‌ام به هنر از سال‌های ابتدایی مدرسه شکل گرفت و با گذر زمان به معماری گرایش پیدا کردم؛ علاقه‌ای که تبدیل به هدفی مشخص برای ادامه تحصیل و مسیر حرفه‌ای من شد.
مقطع کارشناسی را در رشته مهندسی معماری گذراندم و پس از آن، برای گسترش دانش و توانمندی‌هایم، کارشناسی ارشد را در رشته مدیریت پروژه و ساخت ادامه دادم. این ترکیب تخصصی به من دیدی گسترده‌تر از طراحی تا اجرا داد و این امکان را فراهم آورد تا پروژه‌ها را با نگرشی جامع و دقیق تر بررسی کنم.
این صفحه، آرشیوی از سوابق کاری و نمونه پروژه‌هایی است که منعکس‌کننده سبک کاری و خط فکری من هستند؛ پروژه‌هایی که با تمرکز بر کیفیت و خلاقیت اجرا شده‌اند.
از دریافت نظرات و پیشنهادات شما صمیمانه استقبال می‌کنم و باور دارم بازخوردها، بهترین راه برای رشد و پیشرفت حرفه‌ای هستند.`;

  const { error } = await supabase
    .from("site_settings")
    .update({
      full_name: "Narjes Ghaffari",
      role_label: "architect portfolio",
      hero_intro: heroIntro,
      about_bio: aboutBio,
      instagram_url: "https://www.instagram.com/nrjs.ghafari.architect/",
      instagram_handle: "nrjs.ghafari.architect",
      email: "narjes.ghaffari1999@gmail.com",
      avatar_url: avatarUrl,
      hero_bg_url: heroBgUrl,
      cv_url: cvUrl,
    })
    .eq("id", 1);
  if (error) throw new Error(`settings update: ${error.message}`);
  console.log("  ✓ site settings");
}

async function main() {
  await migrateProjects();
  await migrateSettings();
  console.log("\nMigration complete. ✅");
}

main().catch((err) => {
  console.error("\nMigration failed:", err.message);
  process.exit(1);
});
