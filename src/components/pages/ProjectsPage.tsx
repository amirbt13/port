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
              <Image
                src={`/images/${project.name}/${project.cover}.jpg`}
                alt={project.title}
                width={400}
                height={400}
                className=" rounded-md max-w-full max-h-full"
              />
            </div>
          </CardComponent>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsPage;
