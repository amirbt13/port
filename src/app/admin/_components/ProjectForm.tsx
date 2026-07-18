"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProject, IProjectImage } from "@/types/project";
import type { ActionState } from "../actions";

type Action = (
  prev: ActionState,
  formData: FormData
) => Promise<ActionState>;

interface ProjectFormProps {
  action: Action;
  submitLabel: string;
  project?: IProject;
}

const inputClass = "admin-input";
const labelClass = "flex flex-col gap-2 text-sm font-semibold";

export default function ProjectForm({
  action,
  submitLabel,
  project,
}: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [kept, setKept] = useState<IProjectImage[]>(project?.images ?? []);
  const [coverUrl, setCoverUrl] = useState<string>(project?.cover_url ?? "");

  const removeImage = (path: string) => {
    setKept((prev) => {
      const next = prev.filter((img) => img.path !== path);
      if (!next.some((img) => img.url === coverUrl)) {
        setCoverUrl(next[0]?.url ?? "");
      }
      return next;
    });
  };

  return (
    <form action={formAction} className="glass-panel flex flex-col gap-7 rounded-[1.75rem] p-6 md:p-9">
      {project && <input type="hidden" name="id" value={project.id} />}
      <input type="hidden" name="existingImages" value={JSON.stringify(kept)} />
      <input type="hidden" name="cover_url" value={coverUrl} />

      <div>
        <p className="eyebrow">Project information</p>
        <p className="mt-2 text-sm text-muted-foreground">The title and location become part of the public project route.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Title
          <input
            name="title"
            required
            defaultValue={project?.title}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Slug (URL/folder name, e.g. &quot;afra&quot;)
          <input
            name="name"
            defaultValue={project?.name}
            placeholder="auto from title if empty"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Subtitle
          <input
            name="subtitle"
            defaultValue={project?.subtitle}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          City
          <input
            name="city"
            defaultValue={project?.city}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Year
          <input
            name="dateYear"
            defaultValue={project?.dateYear}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Month
          <input
            name="dateMonth"
            defaultValue={project?.dateMonth}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Sort order (lower shows first)
          <input
            name="sortOrder"
            type="number"
            defaultValue={project?.sortOrder ?? 0}
            className={inputClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Description (HTML supported)
        <textarea
          name="description"
          rows={12}
          defaultValue={project?.description}
          className={`${inputClass} min-h-56 font-mono text-sm leading-6`}
        />
      </label>

      {kept.length > 0 && (
        <div className="rounded-2xl border border-border bg-background/40 p-4">
          <p className="text-sm font-bold">
            Current images — pick the cover, or remove any
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {kept.map((img) => (
              <div
                key={img.path}
                className="relative w-28 flex flex-col items-center gap-2 rounded-xl border border-border bg-card/60 p-2"
              >
                <Image
                  src={img.url}
                  alt=""
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="radio"
                    name="coverPick"
                    checked={coverUrl === img.url}
                    onChange={() => setCoverUrl(img.url)}
                  />
                  Cover
                </label>
                <button
                  type="button"
                  onClick={() => removeImage(img.path)}
                  className="text-xs font-bold text-red-600 dark:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className={`${labelClass} rounded-2xl border border-dashed border-border bg-background/35 p-5`}>
        Add images (you can select several)
        <input
          name="newImages"
          type="file"
          accept="image/*"
          multiple
          className="text-sm text-muted-foreground"
        />
      </label>

      {state.error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-200">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin"
          className="button-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
