import HeaderLogo from "@/components/modules/logo/HeaderLogo";
import ThemeToggle from "@/components/modules/themeToggle/ThemeToggle";
import Link from "next/link";
import BurgerMenu from "@/components/layouts/header/BurgerMenu";

const HeaderLayout = () => {
  return (
    <div className="navbar flex items-center justify-between py-4 dark:bg-slate-800 bg-slate-400 md:px-8 px-3 dark:text-white text-black relative z-20">
      <div className="navbar-start hidden md:block">
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-x-1">
        <HeaderLogo className="md:w-12 md:h-12 w-8 h-8" />
        <Link href={"/"}>
          <h1 className="text-l md:text-2xl">Narjes Ghaffari</h1>
        </Link>
      </div>
      <div className="navbar-end">
        <BurgerMenu />
        <ul className="hidden md:flex gap-x-4">
          <li className=" hover:scale-110 hover:border-b border-black  transition-all duration-300 ">
            <Link href={"/projects"}>Projects</Link>
          </li>
          <li className=" hover:scale-110 hover:border-b border-black  transition-all duration-300">
            <Link href={"/about-me"}>About Me</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderLayout;
