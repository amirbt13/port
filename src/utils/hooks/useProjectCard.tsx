import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSelector } from "react-redux";

const projectHref = (project: {
  city: string;
  dateYear: string;
  dateMonth: string;
  title: string;
}) =>
  `/projects/${encodeURIComponent(project.city)}/${encodeURIComponent(
    project.dateYear
  )}/${encodeURIComponent(project.dateMonth)}/${encodeURIComponent(project.title)}`;

const useProjectCard = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);

  const projectCards = useMemo(
    () =>
      projects.map((project, index) => ({
        component: (
          <Link
            href={projectHref(project)}
            className="group block overflow-hidden rounded-[1.5rem] bg-foreground text-background shadow-2xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {project.cover_url ? (
                <Image
                  src={project.cover_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  quality={60}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] text-white/70 uppercase">
                    {project.city} · {project.dateYear}
                  </span>
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
                    {project.title}
                  </h2>
                </div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </div>
              <span className="absolute left-5 top-5 text-xs font-bold tracking-[0.14em] text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </Link>
        ),
        id: project.id,
      })),
    [projects]
  );

  return { projectCards };
};

export default useProjectCard;
