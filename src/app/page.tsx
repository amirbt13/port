import HomePage from "@/components/pages/HomePage";
import staticData from "../data/staticData.json";
import { IProject } from "@/types/project";
export default function Home() {
  const projects: IProject[] = staticData;
  return <HomePage projects={projects} />;
}
