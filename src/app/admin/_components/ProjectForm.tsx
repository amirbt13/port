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

const inputClass =
  "rounded-md border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 w-full";
const labelClass = "flex flex-col gap-1 text-sm";

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
    <form action={formAction} className="flex flex-col gap-5">
      {project && <input type="hidden" name="id" value={project.id} />}
      <input type="hidden" name="existingImages" value={JSON.stringify(kept)} />
      <input type="hidden" name="cover_url" value={coverUrl} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          className={`${inputClass} font-mono text-sm`}
        />
      </label>

      {kept.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">
            Current images — pick the cover, or remove any
          </p>
          <div className="flex flex-wrap gap-3">
            {kept.map((img) => (
              <div
                key={img.path}
                className="relative w-28 flex flex-col items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 p-2"
              >
                <Image
                  src={img.url}
                  alt=""
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded"
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
                  className="text-xs text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className={labelClass}>
        Add images (you can select several)
        <input
          name="newImages"
          type="file"
          accept="image/*"
          multiple
          className="text-sm"
        />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-green-600 text-white px-5 py-2 font-medium disabled:opacity-60"
        >
          {isPending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin"
          className="rounded-md border border-slate-300 dark:border-slate-600 px-5 py-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
