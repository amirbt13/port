import Image from "next/image";
import TehUni from "@/public/images/teh_uni.jpg";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import { ISiteSettings } from "@/types/project";

interface AboutMePageProps {
  settings: ISiteSettings;
}

const AboutMePage = ({ settings }: AboutMePageProps) => {
  const portrait = settings.avatarUrl || TehUni;

  return (
    <section className="site-container px-0 pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] bg-secondary lg:min-h-[42rem] lg:rounded-[2rem]">
          <Image
            src={portrait}
            alt={settings.fullName || "Narjes Ghaffari"}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            quality={70}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-[12rem] text-sm font-semibold leading-6 text-white">
            Designing spaces that feel as considered as they are lived in.
          </p>
        </div>

        <div className="glass-panel flex flex-col rounded-[1.75rem] p-6 md:p-10 lg:rounded-[2rem] lg:p-12">
          <p className="eyebrow">Studio notes</p>
          <h1 className="display-type mt-6 max-w-xl text-5xl leading-[0.9] md:text-7xl">
            A practice grounded in place and possibility.
          </h1>

          <div className="mt-10 max-w-2xl text-justify text-base leading-9 text-muted-foreground md:text-lg" dir="rtl">
            <p className="whitespace-pre-line">{settings.aboutBio}</p>
          </div>

          <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2">
            {settings.instagramUrl && (
              <Link
                href={settings.instagramUrl}
                target="_blank"
                className="group flex min-h-14 items-center justify-between rounded-2xl border border-border bg-background/50 px-4 transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-3 font-bold"><Instagram size={18} aria-hidden="true" /> Instagram</span>
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="group flex min-h-14 items-center justify-between rounded-2xl border border-border bg-background/50 px-4 transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-3 font-bold"><Mail size={18} aria-hidden="true" /> Email</span>
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMePage;
