import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/data/projects";
import { deleteProjectAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-green-600 text-white px-4 py-2 text-sm font-medium"
        >
          + New project
        </Link>
      </div>

      {projects.length === 0 && (
        <p className="text-slate-500">No projects yet. Add your first one.</p>
      )}

      <ul className="flex flex-col gap-3">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex items-center gap-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3"
          >
            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              {project.cover_url ? (
                <Image
                  src={project.cover_url}
                  alt={project.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {project.title}{" "}
                <span className="text-slate-400 text-sm">/ {project.name}</span>
              </p>
              <p className="text-sm text-slate-500 truncate">
                {project.subtitle} · {project.city} · {project.dateYear}/
                {project.dateMonth} · {project.images.length} image(s)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="rounded-md border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm"
              >
                Edit
              </Link>
              <form action={deleteProjectAction}>
                <input type="hidden" name="id" value={project.id} />
                <button
                  type="submit"
                  className="rounded-md border border-red-300 text-red-600 px-3 py-1.5 text-sm"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
