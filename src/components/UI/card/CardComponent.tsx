import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/public/components/ui/card";
import React from "react";
import BadgeComponent from "../badge/BadgeComponent";

interface CardComponentProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const CardComponent = ({ title, subtitle, children }: CardComponentProps) => {
  return (
    <Card className=" shadow-2xl  ">
      <CardHeader>
        <CardTitle className=" text-right text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BadgeComponent variant={"default"}>{subtitle}</BadgeComponent>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;
