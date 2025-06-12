"use client";
import ThemeToggle from "@/components/modules/themeToggle/ThemeToggle";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { Separator } from "@/public/components/ui/separator";
import { usePathname } from "next/navigation";

const BurgerMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const pathname = usePathname();
  const openMenu = (open: boolean) => {
    setMenuIsOpen(open);
  };

  useEffect(() => {
    openMenu(false);
  }, [pathname]);
  return (
    <>
      <div
        className={`${
          menuIsOpen ? "translate-y-none" : "-translate-y-full"
        }  fixed top-0 left-0  w-full z-20 dark:bg-slate-950 transition-transform duration-150 bg-slate-300 p-3 pt-10`}
      >
        <ul className="flex flex-col justify-center items-center gap-y-4 dark:text-white text-slate-950">
          <li className="w-full text-center">
            <Link href={"/"}>Main</Link>
          </li>
          <Separator />
          <li className="w-full text-center">
            <Link href={"/projects"}>Projects</Link>
          </li>
          <Separator />
          <li className="w-full text-center">
            <Link href={"/about-me"}>About Me</Link>
          </li>
          <Separator />
        </ul>
        <div className="flex justify-between items-center mt-4">
          <ThemeToggle />
          <div>
            <IoClose size={30} onClick={() => openMenu(false)} />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <RxHamburgerMenu size={30} onClick={() => openMenu(true)} />
      </div>
    </>
  );
};

export default BurgerMenu;
