"use client";

import { CarouselComponent } from "../carousel/CarouselComponent";
import useProjectCard from "@/utils/hooks/useProjectCard";
import AvatarComponent from "@/components/UI/avatart/AvatarComponent";
import Link from "next/link";
import { ArrowDownRight, Download, FolderOpen } from "lucide-react";
import { ISiteSettings } from "@/types/project";

interface HeroSectionProps {
  settings: ISiteSettings;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "NG";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

const HeroSection = ({ settings }: HeroSectionProps) => {
  const { projectCards } = useProjectCard();

  return (
    <section className="site-container relative px-0 pb-12 pt-8 md:pb-20 md:pt-12">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] px-5 py-6 md:rounded-[2.5rem] md:px-10 md:py-12 lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale-[0.35] dark:opacity-25"
          style={
            settings.heroBgUrl
              ? { backgroundImage: `url(${settings.heroBgUrl})` }
              : undefined
          }
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-background via-background/88 to-background/45" />
        <div aria-hidden="true" className="absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.64fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Architecture portfolio · Tehran</p>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <AvatarComponent
                className="size-20 shrink-0 border-4 border-background shadow-2xl sm:size-24"
                source={settings.avatarUrl || "/images/avatar.jpg"}
                fallbackLetters={initials(settings.fullName)}
              />
              <div>
                <h1 className="display-type text-5xl leading-[0.84] sm:text-6xl lg:text-8xl">
                  {settings.fullName || "Narjes Ghaffari"}
                </h1>
                <p className="mt-3 text-xs font-bold tracking-[0.2em] text-accent uppercase sm:text-sm">
                  {settings.roleLabel || "Architect"}
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              {settings.heroIntro ||
                "A collection of spaces shaped by context, material, and the quiet rituals of everyday life."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className="button-primary">
                View selected work
                <FolderOpen size={17} aria-hidden="true" />
              </Link>
              {settings.cvUrl && (
                <a
                  href={settings.cvUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary"
                >
                  Download CV
                  <Download size={17} aria-hidden="true" />
                </a>
              )}
              <Link href="/about-me" className="button-secondary">
                Studio notes
                <ArrowDownRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="min-w-0 lg:pb-1">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="eyebrow">In focus</p>
                <p className="mt-2 text-sm text-muted-foreground">A rotating selection of recent studies</p>
              </div>
              <span className="display-type text-4xl text-muted-foreground/50">01</span>
            </div>
            <CarouselComponent cardsList={projectCards} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
