import { notFound } from "next/navigation";
import ProjectForm from "../../../_components/ProjectForm";
import { updateProjectAction } from "../../../actions";
import { getProjectById } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="eyebrow">Collection / edit</p>
        <h1 className="display-type mt-4 text-5xl leading-[0.9]">{project.title}</h1>
      </div>
      <ProjectForm
        action={updateProjectAction}
        submitLabel="Save changes"
        project={project}
      />
    </div>
  );
}
