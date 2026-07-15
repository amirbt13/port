import { IProject } from "@/types/project";
import CardComponent from "../UI/card/CardComponent";
import Image from "next/image";
import Link from "next/link";

interface ProjectsPageProps {
  projects: IProject[];
}

const ProjectsPage = ({ projects }: ProjectsPageProps) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {projects.map((project) => (
        <Link
          href={`projects/${project.city}/${project.dateYear}/${project.dateMonth}/${project.title}`}
          key={project.id}
        >
          <CardComponent title={project.title} subtitle={""}>
            <div className="flex flex-col justify-center items-center h-100">
              {project.cover_url ? (
                <Image
                  src={project.cover_url}
                  alt={project.title}
                  width={400}
                  height={400}
                  quality={60}
                  className=" rounded-md max-w-full max-h-full"
                />
              ) : (
                <div className="w-full h-full rounded-md bg-slate-200 dark:bg-slate-700" />
              )}
            </div>
          </CardComponent>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsPage;
