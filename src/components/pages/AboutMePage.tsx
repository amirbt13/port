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
          quality={50}
          className="rounded-md w-[85%] md:w-full relative top-10 md:top-0 md:left-1/3 dark:border border-white"
        />
      </div>
      <div className="flex flex-col gap-y-4 md:p-8">
        <div
          className=" relative top-10 p-4 pt-8  text-justify font-light "
          style={{ direction: "rtl" }}
        >
          <p>
           سلام،
من نرجس غفاری هستم، متولد پاییز ۱۳۷۸ در تهران. علاقه‌ام به هنر از سال‌های ابتدایی مدرسه شکل گرفت و با گذر زمان به معماری گرایش پیدا کردم؛ علاقه‌ای که تبدیل به هدفی مشخص برای ادامه تحصیل و مسیر حرفه‌ای من شد.
مقطع کارشناسی را در رشته مهندسی معماری گذراندم و پس از آن، برای گسترش دانش و توانمندی‌هایم، کارشناسی ارشد را در رشته مدیریت پروژه و ساخت ادامه دادم. این ترکیب تخصصی به من دیدی گسترده‌تر از طراحی تا اجرا داد و این امکان را فراهم آورد تا پروژه‌ها را با نگرشی جامع و دقیق تر بررسی کنم.
این صفحه، آرشیوی از سوابق کاری و نمونه پروژه‌هایی است که منعکس‌کننده سبک کاری و خط فکری من هستند؛ پروژه‌هایی که با تمرکز بر کیفیت و خلاقیت اجرا شده‌اند.
از دریافت نظرات و پیشنهادات شما صمیمانه استقبال می‌کنم و باور دارم بازخوردها، بهترین راه برای رشد و پیشرفت حرفه‌ای هستند.
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
