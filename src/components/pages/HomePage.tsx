"use client";
import { IProject, ISiteSettings } from "@/types/project";
import React, { useEffect } from "react";
import HeroSection from "../modules/hero/HeroSection";
import { useDispatch } from "react-redux";
import { addBulkProjects } from "@/redux/projects/projectsSlice";

interface Props {
  projects: IProject[];
  settings: ISiteSettings;
}

const HomePage: React.FC<Props> = ({ projects, settings }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addBulkProjects(projects));
  }, [dispatch, projects]);

  return (
    <div>
      <HeroSection settings={settings} />
    </div>
  );
};

export default HomePage;
