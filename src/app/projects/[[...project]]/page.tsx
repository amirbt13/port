import ProjectDetailsPage from "@/components/pages/ProjectDetailsPage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { IProject } from "@/types/project";
import staticData from "../../../data/staticData.json";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { project: string };
}) {
  const { project } = await params;
  const projects: IProject[] = staticData;
  if (!project) {
    // console.log("!project");
    return <ProjectsPage projects={projects} />;
  }
  const [city, dateYear, dateMonth, title] = project;
  const foundProject = projects.find(
    (project) =>
      project.city.toLowerCase() === decodeURIComponent(city.toLowerCase()) &&
      project.dateYear.toLowerCase() ===
        decodeURIComponent(dateYear.toLowerCase()) &&
      project.dateMonth.toLowerCase() ===
        decodeURIComponent(dateMonth.toLowerCase()) &&
      project.title.toLowerCase() === decodeURIComponent(title.toLowerCase())
  );
  if (!foundProject) {
    console.log("!foundProject");
    redirect("/projects");
  }
  return <ProjectDetailsPage project={foundProject} />;
}
