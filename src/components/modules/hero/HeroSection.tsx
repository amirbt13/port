import React from "react";
import { CarouselComponent } from "../carousel/CarouselComponent";
import useProjectCard from "@/utils/hooks/useProjectCard";
import ButtonComponent from "@/components/UI/button/ButtonComponent";
import AvatarComponent from "@/components/UI/avatart/AvatarComponent";
import { redirect } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

const HeroSection = () => {
  const { projectCards } = useProjectCard();
  return (
    <>
      <div className="w-full h-full absolute left-0 top-0 bg-[url(/images/afra/2.jpg)] bg-cover bg-center opacity-15 z-0"></div>
      <div className="hero   p-6  z-10 relative">
        <div className="flex md:gap-x-8 gap-y-8 h-full flex-col-reverse md:flex-row ">
          <div className="w-5/6 md:w-1/3 lg:w-1/4 md:mr-6">
            <CarouselComponent cardsList={projectCards} />
          </div>
          <div className="pt-8 px-4 md:px-8 flex flex-col gap-y-8 ">
            <div className="flex flex-col gap-y-10 h-full w-full md:w-2/3">
              <div className="flex flex-col   gap-x-8 gap-y-8">
                <div className="flex gap-x-4 flex-col items-center gap-y-4 md:flex-row">
                  <AvatarComponent
                    className="w-36 h-36  p shadow-2xl border-slate-500 "
                    source="/images/avatar.jpg"
                    fallbackLetters="NG"
                  />
                  <h1 className="text-5xl md:text-5xl text-center md:text-left ">
                    Narjes Ghaffari{" "}
                    <span className=" text-3xl block text-lime-900 mt-3">
                      {"architecht portfolio".toUpperCase()}
                    </span>
                  </h1>{" "}
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className=" font-light">
                    In this collection, you witness the precise intersection of
                    concept, functionality, and aesthetics — where each project
                    reflects a commitment to quality, innovation, and respect
                    for the surrounding environment. I hope this portfolio
                    conveys my professional vision and capabilities in creating
                    sustainable and enduring spaces.
                  </p>
                  <p className=""></p>
                  <p className=""></p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2 w-full ">
                <ButtonComponent
                  onClicked={() => redirect("/projects")}
                  label={
                    <div className="flex items-center gap-2 ">
                      <FaBuilding />
                      My Projects
                    </div>
                  }
                  className="md:w-fit w-full px-8 py-5 cursor-pointer bg-green-600 text-white"
                />
                <a href="/narjes_ghaffari_resume.pdf" download>
                  <ButtonComponent
                    label={
                      <div className="flex items-center gap-2">
                        <FiDownload />
                        Download CV
                      </div>
                    }
                    className="md:w-fit w-full px-8 py-5 cursor-pointer bg-blue-800 text-white"
                    onClicked={() => null}
                  />
                </a>
                <ButtonComponent
                  onClicked={() => redirect("/about-me")}
                  label={
                    <div className="flex items-center gap-2">
                      <FaUser />
                      About Me
                    </div>
                  }
                  className="md:w-fit w-full px-8 py-5 cursor-pointer bg-violet-600 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
