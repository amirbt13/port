import ProjectForm from "../../_components/ProjectForm";
import { createProjectAction } from "../../actions";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">New project</h1>
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </div>
  );
}
