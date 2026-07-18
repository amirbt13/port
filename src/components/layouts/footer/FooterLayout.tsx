import Link from "next/link";
import { ArrowUpRight, Instagram } from "lucide-react";

const FooterLayout = () => {
  return (
    <footer className="px-3 pb-3 pt-10 md:px-6 md:pb-6 md:pt-16">
      <div className="site-container glass-panel rounded-[1.75rem] px-5 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Selected work · 2025</p>
            <p className="display-type mt-4 max-w-md text-3xl leading-[0.95] md:text-4xl">
              Spaces designed with clarity, calm, and a sense of permanence.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-bold transition-colors hover:text-accent"
            >
              Explore the portfolio
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="https://www.instagram.com/nrjs.ghafari.architect/"
              target="_blank"
              className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram size={16} />
              @nrjs.ghafari.architect
              <ArrowUpRight size={14} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          <span>Narjes Ghaffari · Architecture portfolio</span>
          <span>Tehran, Iran</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
