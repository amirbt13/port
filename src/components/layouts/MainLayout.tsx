import React from "react";
import HeaderLayout from "./header/HeaderLayout";
import FooterLayout from "./footer/FooterLayout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderLayout />
      <div className="min-h-[calc(100dvh-5rem)]">{children}</div>
      <FooterLayout />
    </>
  );
};

export default MainLayout;
