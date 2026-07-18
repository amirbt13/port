"use client";

import { usePathname } from "next/navigation";
import HeaderLayout from "./header/HeaderLayout";
import FooterLayout from "./footer/FooterLayout";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <HeaderLayout />
      <main id="main-content" className="min-h-[calc(100dvh-11rem)]">
        {children}
      </main>
      <FooterLayout />
    </div>
  );
};

export default MainLayout;
