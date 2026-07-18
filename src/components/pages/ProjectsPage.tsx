import { IProject } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

interface ProjectsPageProps {
  projects: IProject[];
}

const projectHref = (project: IProject) =>
  `/projects/${encodeURIComponent(project.city)}/${encodeURIComponent(
    project.dateYear
  )}/${encodeURIComponent(project.dateMonth)}/${encodeURIComponent(project.title)}`;

const ProjectsPage = ({ projects }: ProjectsPageProps) => {
  return (
    <section className="site-container px-0 pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">Selected work</p>
          <h1 className="display-type mt-5 text-5xl leading-[0.9] md:text-7xl">
            Built for the way people live.
          </h1>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground md:text-right">
          A focused archive of residential, hospitality, and renovation projects—each shaped by its place and purpose.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between border-y border-border py-4 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
        <span>{projects.length} projects</span>
        <span>2020 — 2025</span>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link
            href={projectHref(project)}
            key={project.id}
            className="group relative overflow-hidden rounded-[1.5rem] bg-foreground shadow-[0_18px_45px_rgb(24_24_27_/_12%)]"
          >
            <div className="relative aspect-[4/5]">
              {project.cover_url ? (
                <Image
                  src={project.cover_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  quality={65}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/5" />
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/15 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-white backdrop-blur uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-white/70">
                      <MapPin size={13} aria-hidden="true" />
                      {project.city}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">{project.title}</h2>
                    {project.subtitle && <p className="mt-1 text-sm text-white/75">{project.subtitle}</p>}
                  </div>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-5 border-t border-white/20 pt-3 text-xs font-bold tracking-[0.14em] text-white/75 uppercase">
                  {project.dateMonth} · {project.dateYear}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
