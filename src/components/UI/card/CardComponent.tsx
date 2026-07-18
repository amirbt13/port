import React from "react";

interface CardComponentProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const CardComponent = ({ title, subtitle, children }: CardComponentProps) => {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_18px_45px_rgb(24_24_27_/_8%)] transition-transform duration-200 hover:-translate-y-1">
      <div className="p-5">
        <p className="text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          {subtitle || "Selected work"}
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </article>
  );
};

export default CardComponent;
