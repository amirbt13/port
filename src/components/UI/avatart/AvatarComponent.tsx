import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/public/components/ui/avatar";
import React from "react";

interface AvatarComponentProps {
  source: string;
  fallbackLetters: string;
  className?: string;
}

const AvatarComponent = ({
  source,
  fallbackLetters,
  className,
}: AvatarComponentProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={source} width={400} height={400} />
      <AvatarFallback>{fallbackLetters}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
