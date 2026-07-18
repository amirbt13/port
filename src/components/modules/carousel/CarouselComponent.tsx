import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/public/components/ui/carousel";
import React from "react";

interface CarouselComponentProps {
  cardsList: { component: React.ReactNode; id: string }[];
  withControls?: boolean;
}

export const CarouselComponent = ({
  cardsList,
  withControls = true,
}: CarouselComponentProps) => {
  if (cardsList.length === 0) {
    return <div className="aspect-[4/5] animate-pulse rounded-[1.5rem] bg-secondary" />;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {cardsList.map((card) => (
          <CarouselItem key={card.id}>{card.component}</CarouselItem>
        ))}
      </CarouselContent>
      {withControls && cardsList.length > 1 ? (
        <>
          <CarouselPrevious className="left-3 top-auto bottom-3 size-10 border-0 bg-background/90 text-foreground shadow-lg backdrop-blur hover:bg-background" />
          <CarouselNext className="right-3 top-auto bottom-3 size-10 border-0 bg-background/90 text-foreground shadow-lg backdrop-blur hover:bg-background" />
        </>
      ) : null}
    </Carousel>
  );
};
