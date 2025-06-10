"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

interface LogoProps {
  className?: string;
}

const HeaderLogo = ({ className }: LogoProps) => {
  const darkmode = useSelector((state: RootState) => state.darkmode.value);
  const logoSetter = darkmode ? "/ng-dark.svg" : "/ng-light.svg";
  return (
    <Image
      src={logoSetter}
      alt="ng-logo"
      width={100}
      height={100}
      className={className}
    />
  );
};

export default HeaderLogo;
