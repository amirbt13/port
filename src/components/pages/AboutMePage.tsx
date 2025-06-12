import Image from "next/image";
import TehUni from "@/public/images/teh_uni.jpg";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
// import { MdOutlinePhoneIphone } from "react-icons/md";
import Link from "next/link";

const AboutMePage = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex md:w-1/2 md:h-[90dvh] justify-center items-center  dark:bg-slate-700 bg-slate-300 ">
        <Image
          src={TehUni}
          alt="Narjes Ghaffari in Tehran University"
          quality={70}
          className="rounded-md w-[85%] md:w-full relative top-10 md:top-0 md:left-1/3 dark:border border-white"
        />
      </div>
      <div className="flex flex-col gap-y-4 md:p-8">
        <div
          className=" relative top-10 p-4 pt-8  text-justify font-light "
          style={{ direction: "rtl" }}
        >
          <p>
            من نرجس غفاری‌ام؛ معمار و خالق فضاهایی که در تلاش اند فراتر از سازه‌
            باشند. با دانش معماری و مدیریت پروژه، بیش از سه سال است که به طراحی
            داخلی و خارجی می‌پردازم، جایی که هر خط و فرم، زبانی است برای روایت
            داستانی منحصر به فرد. علاقه‌ام خلق فضاهایی است که همزمان الهام‌بخش و
            کاربردی باشند؛ جایی که نور، متریال و مقیاس در هم می‌آمیزند و
            تجربه‌ای چندبعدی رقم می‌زنند. معماری برای من، بازی با حجم‌ها و حس
            هاست، ساختن مکانی برای زندگی، تجربه فضا و خلق خاطره.
          </p>
        </div>
        <div className=" p-4 flex md:flex-row flex-col gap-y-2 md:justify-end">
          <Link
            href={"https://www.instagram.com/nrjs.ghafari.architect/"}
            target="_blank"
          >
            <p className="flex items-center gap-x-1 font-light">
              <FaInstagram size={30} /> nrjs.ghafari.architect
            </p>
          </Link>
          <p className="flex items-center gap-x-1 font-light">
            <MdEmail size={30} /> narjes.ghaffari1999@gmail.com
          </p>

          {/* <p className="flex items-center gap-x-1">
            <MdOutlinePhoneIphone size={30} /> 
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
