"use client";
import { IProject } from "@/types/project";
import React, { useState } from "react";
import Image from "next/image";

interface ProjectDetailsPageProps {
  project: IProject;
}

const ProjectDetailsPage = ({ project }: ProjectDetailsPageProps) => {
  const [selectedImage, setSelectedImage] = useState(project.imageUrls[0]);
  return (
    <div className="flex flex-col md:flex-row h-full">
      <main className=" flex-2/3 p-6 flex flex-col gap-6 h-full">
        <div className=" w-full flex items-center justify-center min-h-[55vh]">
          <Image
            src={`/images/${project.name}/${selectedImage}.jpg`}
            alt={project.title}
            width={400}
            height={400}
            className=" rounded-md border-2 border-slate-100"
          />
        </div>
        <div className=" flex flex-wrap gap-2">
          {project.imageUrls.map((imageUrl) => (
            <Image
              key={imageUrl}
              src={`/images/${project.name}/${imageUrl}.jpg`}
              alt={project.title}
              width={100}
              height={100}
              className=" dark:border border-slate-100 rounded-md cursor-pointer"
              onClick={() => setSelectedImage(imageUrl)}
            />
          ))}
        </div>
      </main>
      <aside
        className=" flex-1/3 dark:bg-slate-700 bg-slate-200 h-dvh p-6"
        style={{ direction: "rtl" }}
      >
        <div className=" mb-2 flex flex-col gap-3">
          <h1 className=" text-6xl">{project.title}</h1>
          <h2 className=" text-2xl">{project.subtitle}</h2>
        </div>
        <p>{project.description}</p>
        <div className=" mt-3">
          <p>{project.city}</p>
          <p>
            {project.dateYear} / {project.dateMonth}
          </p>
        </div>
      </aside>
    </div>
  );
};

export default ProjectDetailsPage;
