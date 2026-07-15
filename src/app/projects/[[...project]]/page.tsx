import ProjectDetailsPage from "@/components/pages/ProjectDetailsPage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { getProjects, getProjectByRouteParams } from "@/lib/data/projects";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ project: string[] }>;
}) {
  const { project } = await params;

  if (!project || project.length === 0) {
    const projects = await getProjects();
    return <ProjectsPage projects={projects} />;
  }

  const [city, dateYear, dateMonth, title] = project;
  const foundProject = await getProjectByRouteParams(
    city,
    dateYear,
    dateMonth,
    title
  );

  if (!foundProject) {
    redirect("/projects");
  }
  return <ProjectDetailsPage project={foundProject} />;
}
