import HomePage from "@/components/pages/HomePage";
import { getProjects } from "@/lib/data/projects";
import { getSettings } from "@/lib/data/settings";

// Re-fetch on each request so admin edits show up immediately
// (also refreshed on-demand via revalidatePath after mutations).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings(),
  ]);
  return <HomePage projects={projects} settings={settings} />;
}
