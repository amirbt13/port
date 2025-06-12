import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const FooterLayout = () => {
  return (
    <div className=" py-4 dark:bg-slate-800 bg-slate-400 h-full flex items-center justify-center gap-x-3 w-full">
      <p>Narjes Ghaffari Portfolio</p>
      <p className="font-light text-2xl">|</p>
      <p>2025</p>
      <p className="font-light text-2xl">|</p>
      <Link
        href={"https://www.instagram.com/nrjs.ghafari.architect/"}
        target="_blank"
      >
        <FaInstagram size={25} />
      </Link>
    </div>
  );
};

export default FooterLayout;
