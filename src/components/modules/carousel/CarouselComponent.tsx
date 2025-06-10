import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/public/components/ui/carousel";
import React from "react";

interface CarouselComponentProps<> {
  cardsList: { component: React.ReactNode; id: number }[];
  withControls?: boolean;
}

export const CarouselComponent = ({
  cardsList,
  withControls = true,
}: CarouselComponentProps) => {
  return (
    <Carousel className="w-full mx-8">
      <CarouselContent>
        {cardsList.map((card) => (
          <CarouselItem key={card.id}>{card.component}</CarouselItem>
        ))}
      </CarouselContent>
      {withControls ? (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      ) : null}
    </Carousel>
  );
};
