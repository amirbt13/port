"use client";
import { IProject } from "@/types/project";
import React, { useEffect } from "react";
import HeroSection from "../modules/hero/HeroSection";
import { useDispatch } from "react-redux";
import { addBulkProjects } from "@/redux/projects/projectsSlice";

interface Props {
  projects: IProject[];
}

const HomePage: React.FC<Props> = ({ projects }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addBulkProjects(projects));
  }, [dispatch, projects]);

  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default HomePage;
