import ProjectForm from "../../_components/ProjectForm";
import { createProjectAction } from "../../actions";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="eyebrow">Collection</p>
        <h1 className="display-type mt-4 text-5xl leading-[0.9]">Add a new project.</h1>
      </div>
      <ProjectForm action={createProjectAction} submitLabel="Create project" />
    </div>
  );
}
