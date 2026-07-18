import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/data/projects";
import { deleteProjectAction } from "./actions";
import { ImageIcon, Pencil, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      <section className="glass-panel overflow-hidden rounded-[1.75rem] p-6 md:rounded-[2rem] md:p-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Workspace</p>
            <h1 className="display-type mt-4 text-5xl leading-[0.9] md:text-6xl">Manage the portfolio.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Curate the work, maintain the visual story, and keep the public profile up to date.</p>
          </div>
          <Link href="/admin/projects/new" className="button-primary">
            <Plus size={17} /> New project
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-sm">
          <span className="text-muted-foreground">Published projects</span>
          <span className="display-type text-3xl">{String(projects.length).padStart(2, "0")}</span>
        </div>
      </section>

      {projects.length === 0 ? (
        <section className="glass-panel rounded-[1.5rem] p-8 text-center">
          <ImageIcon className="mx-auto text-muted-foreground" size={32} />
          <h2 className="mt-4 text-xl font-bold">No projects yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Add the first project to bring the portfolio to life.</p>
        </section>
      ) : (
        <ul className="grid gap-4">
          {projects.map((project, index) => (
            <li key={project.id} className="glass-panel flex flex-col gap-4 rounded-[1.4rem] p-3 sm:flex-row sm:items-center sm:p-4">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:h-20 sm:w-28">
                {project.cover_url ? (
                  <Image src={project.cover_url} alt={project.title} fill sizes="112px" className="object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-[0.12em] text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <p className="truncate text-lg font-bold tracking-tight">{project.title}</p>
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">{project.subtitle || project.name} · {project.city} · {project.dateYear}/{project.dateMonth} · {project.images.length} images</p>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <Link href={`/admin/projects/${project.id}/edit`} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border px-3 text-sm font-bold transition-colors hover:bg-secondary">
                  <Pencil size={15} /> Edit
                </Link>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button type="submit" className="min-h-10 rounded-xl border border-red-500/25 px-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-500 hover:text-white dark:text-red-300">
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
