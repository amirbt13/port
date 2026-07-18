"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ISiteSettings } from "@/types/project";
import { updateSettingsAction, type ActionState } from "../actions";

const inputClass = "admin-input";
const labelClass = "flex flex-col gap-2 text-sm font-semibold";

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
    <form action={formAction} className="glass-panel flex flex-col gap-7 rounded-[1.75rem] p-6 md:p-9">
      <div>
        <p className="eyebrow">Identity</p>
        <p className="mt-2 text-sm text-muted-foreground">These details frame the public story across the home and studio pages.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          className={`${inputClass} min-h-28 leading-6`}
        />
      </label>

      <label className={labelClass}>
        About bio (Persian, shown on the About page)
        <textarea
          name="aboutBio"
          rows={8}
          defaultValue={settings.aboutBio}
          className={`${inputClass} min-h-48 leading-7`}
          dir="rtl"
        />
      </label>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-dashed border-border bg-background/35 p-5 md:grid-cols-3">
        <label className={labelClass}>
          Avatar / photo {settings.avatarUrl && "(replace)"}
          <input name="avatar" type="file" accept="image/*" className="text-sm text-muted-foreground" />
        </label>
        <label className={labelClass}>
          Hero background {settings.heroBgUrl && "(replace)"}
          <input name="heroBg" type="file" accept="image/*" className="text-sm text-muted-foreground" />
        </label>
        <label className={labelClass}>
          CV (PDF) {settings.cvUrl && "(replace)"}
          <input
            name="cv"
            type="file"
            accept="application/pdf"
            className="text-sm text-muted-foreground"
          />
        </label>
      </div>

      {state.error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-200">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save personal info"}
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
