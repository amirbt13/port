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
      <div className="w-full h-full absolute left-0 top-0 bg-[url(/images/zarin/3.jpg)] bg-cover bg-center opacity-15 z-0"></div>
      <div className="hero   p-6  z-10 relative">
        <div className="flex md:gap-x-8 gap-y-8 h-full flex-col-reverse md:flex-row ">
          <div className="w-5/6 md:w-1/3 lg:w-1/4 md:mr-6">
            <CarouselComponent cardsList={projectCards} />
          </div>
          <div
            className="pt-8 px-4 md:px-8 flex flex-col gap-y-8 "
            style={{ direction: "rtl" }}
          >
            <div className="flex flex-col gap-y-8">
              <div className="flex md:flex-row flex-col  items-center gap-x-8 gap-y-4">
                <AvatarComponent
                  className="w-36 h-36  p shadow-2xl border-slate-500 "
                  source="/images/avatar.jpg"
                  fallbackLetters="NG"
                />
                <h1 className="text-4xl md:text-5xl ">
                  نرجس شیخ غفاری{" "}
                  <span className="dark:text-fuchsia-400 text-fuchsia-600 text-6xl block mt-3">
                    {"مهندس معمار".toUpperCase()}
                  </span>
                </h1>
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="">
                  با نگاهی خلاقانه به فرم و فضا، معماری برای من پلی است میان
                  زیبایی، عملکرد و هویت. در طراحی‌هایم تلاش می‌کنم تا میان
                  خواستگاه فرهنگی، نیاز کاربر و خوانایی بصری، تعادل برقرار کنم.
                  علاقه‌مند به پروژه‌هایی هستم که نگاه انتقادی، تفکر سیستماتیک و
                  جسارت فرمی را با هم ترکیب می‌کنند.
                </p>
                <p className=""></p>
                <p className=""></p>
              </div>
            </div>
            <div className="flex gap-2">
              <ButtonComponent
                onClicked={() => redirect("/projects")}
                label={
                  <div className="flex items-center gap-2">
                    <FaBuilding />
                    نمونه کارها
                  </div>
                }
                className="md:w-fit w-full px-8 py-5 cursor-pointer bg-green-600 text-white"
              />
              <ButtonComponent
                onClicked={() => null}
                label={
                  <div className="flex items-center gap-2">
                    <FiDownload />
                    دریافت رزومه
                  </div>
                }
                className="md:w-fit w-full px-8 py-5 cursor-pointer bg-blue-800 text-white"
              />
              <ButtonComponent
                onClicked={() => null}
                label={
                  <div className="flex items-center gap-2">
                    <FaUser />
                    درباره ی من
                  </div>
                }
                className="md:w-fit w-full px-8 py-5 cursor-pointer bg-violet-600 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
