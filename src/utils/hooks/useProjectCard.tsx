import CardComponent from "@/components/UI/card/CardComponent";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useProjectCard = () => {
  const [projectCards, setProjectCards] = React.useState<
    {
      component: React.ReactNode;
      id: number;
    }[]
  >([]);

  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    const cards = projects.map((project) => ({
      component: (
        <CardComponent title={project.title} subtitle={project.subtitle}>
          <Link
            href={`projects/${project.city}/${project.dateYear}/${project.dateMonth}/${project.title}`}
          >
            <div className="flex flex-col justify-center items-center h-100">
              <Image
                src={`/images/${project.name}/${project.cover}.jpg`}
                alt={project.title}
                width={300}
                height={200}
                className=" rounded-md h-full w-full"
              />
            </div>
          </Link>
        </CardComponent>
      ),
      id: project.id,
    }));

    setProjectCards(cards);
  }, [projects]);
  return { projectCards };
};

export default useProjectCard;
