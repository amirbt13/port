import Image from "next/image";
import TehUni from "@/public/images/teh_uni.jpg";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { ISiteSettings } from "@/types/project";

interface AboutMePageProps {
  settings: ISiteSettings;
}

const AboutMePage = ({ settings }: AboutMePageProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex md:w-1/2 md:h-[90dvh] justify-center items-center  dark:bg-slate-700 bg-slate-300 ">
        {settings.avatarUrl ? (
          <Image
            src={settings.avatarUrl}
            alt={settings.fullName}
            width={600}
            height={600}
            quality={50}
            className="rounded-md w-[85%] md:w-full relative top-10 md:top-0 md:left-1/3 dark:border border-white"
          />
        ) : (
          <Image
            src={TehUni}
            alt={settings.fullName}
            quality={50}
            className="rounded-md w-[85%] md:w-full relative top-10 md:top-0 md:left-1/3 dark:border border-white"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-4 md:p-8">
        <div
          className=" relative top-10 p-4 pt-8  text-justify font-light "
          style={{ direction: "rtl" }}
        >
          <p className="whitespace-pre-line">{settings.aboutBio}</p>
        </div>
        <div className=" p-4 flex md:flex-row flex-col gap-y-2 md:justify-end">
          {settings.instagramUrl && (
            <Link href={settings.instagramUrl} target="_blank">
              <p className="flex items-center gap-x-1 font-light">
                <FaInstagram size={30} /> {settings.instagramHandle}
              </p>
            </Link>
          )}
          {settings.email && (
            <p className="flex items-center gap-x-1 font-light">
              <MdEmail size={30} /> {settings.email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
