import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import MainProvider from "@/providers/MainProvider";
import { yekan } from "@/utils/font";

export const metadata: Metadata = {
  title: "Narjes Ghaffari | Architect",
  description: "Narjes Ghaffari | Architect Portfolio",
  authors: [
    {
      name: "Developed By AmirMohammad Basirati",
      url: "https://github.com/amirbt13",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${yekan.className} bg-slate-100 dark:bg-gray-900`}
    >
      <body>
        <MainProvider>
          <MainLayout>{children}</MainLayout>
        </MainProvider>
      </body>
    </html>
  );
}
