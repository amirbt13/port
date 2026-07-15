"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ISiteSettings } from "@/types/project";
import { updateSettingsAction, type ActionState } from "../actions";

const inputClass =
  "rounded-md border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 w-full";
const labelClass = "flex flex-col gap-1 text-sm";

export default function SettingsForm({
  settings,
}: {
  settings: ISiteSettings;
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateSettingsAction,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className={labelClass}>
          Full name
          <input
            name="fullName"
            defaultValue={settings.fullName}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Role label (e.g. &quot;architect portfolio&quot;)
          <input
            name="roleLabel"
            defaultValue={settings.roleLabel}
            className={inputClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Hero intro (English, shown on the home page)
        <textarea
          name="heroIntro"
          rows={4}
          defaultValue={settings.heroIntro}
          className={inputClass}
        />
      </label>

      <label className={labelClass}>
        About bio (Persian, shown on the About page)
        <textarea
          name="aboutBio"
          rows={8}
          defaultValue={settings.aboutBio}
          className={inputClass}
          dir="rtl"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className={labelClass}>
          Instagram URL
          <input
            name="instagramUrl"
            defaultValue={settings.instagramUrl}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Instagram handle
          <input
            name="instagramHandle"
            defaultValue={settings.instagramHandle}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Email
          <input
            name="email"
            type="email"
            defaultValue={settings.email}
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className={labelClass}>
          Avatar / photo {settings.avatarUrl && "(replace)"}
          <input name="avatar" type="file" accept="image/*" className="text-sm" />
        </label>
        <label className={labelClass}>
          Hero background {settings.heroBgUrl && "(replace)"}
          <input name="heroBg" type="file" accept="image/*" className="text-sm" />
        </label>
        <label className={labelClass}>
          CV (PDF) {settings.cvUrl && "(replace)"}
          <input
            name="cv"
            type="file"
            accept="application/pdf"
            className="text-sm"
          />
        </label>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-green-600 text-white px-5 py-2 font-medium disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save personal info"}
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
