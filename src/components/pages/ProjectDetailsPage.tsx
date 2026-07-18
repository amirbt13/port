"use client";

import { IProject } from "@/types/project";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

interface ProjectDetailsPageProps {
  project: IProject;
}

const ProjectDetailsPage = ({ project }: ProjectDetailsPageProps) => {
  const [selectedImage, setSelectedImage] = useState(
    project.cover_url || project.images[0]?.url || ""
  );

  return (
    <section className="site-container px-0 pb-14 pt-8 md:pb-24 md:pt-12">
      <Link href="/projects" className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        Back to selected work
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(20rem,0.7fr)] lg:items-start">
        <div className="min-w-0">
          <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[16/11] lg:rounded-[2rem]">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                quality={70}
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-secondary" />
            )}
          </div>

          {project.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2" aria-label="Project image gallery">
              {project.images.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setSelectedImage(image.url)}
                  aria-label={`View image ${index + 1} of ${project.title}`}
                  aria-pressed={selectedImage === image.url}
                  className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all sm:w-24 ${
                    selectedImage === image.url
                      ? "border-accent shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="96px"
                    quality={45}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="glass-panel rounded-[1.75rem] p-6 lg:sticky lg:top-24 lg:rounded-[2rem] lg:p-8">
          <p className="eyebrow">Project dossier</p>
          <h1 className="display-type mt-6 text-5xl leading-[0.9] md:text-6xl">{project.title}</h1>
          {project.subtitle && <p className="mt-4 text-lg leading-7 text-muted-foreground">{project.subtitle}</p>}

          <dl className="mt-8 grid gap-4 border-y border-border py-5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-muted-foreground"><MapPin size={16} aria-hidden="true" /> Location</dt>
              <dd className="font-bold text-right">{project.city}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 text-muted-foreground"><CalendarDays size={16} aria-hidden="true" /> Completion</dt>
              <dd className="font-bold text-right">{project.dateMonth} {project.dateYear}</dd>
            </div>
          </dl>

          <div
            className="prose prose-zinc mt-8 max-w-none text-justify leading-8 text-muted-foreground dark:prose-invert dark:prose-p:text-muted-foreground"
            style={{ direction: "rtl" }}
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </aside>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
