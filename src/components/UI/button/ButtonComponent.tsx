import { Button } from "@/public/components/ui/button";
import React from "react";

interface ButtonComponentProps {
  onClicked: () => void;
  label: string | React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const ButtonComponent = ({
  onClicked,
  label,
  variant = "default",
  className = "",
}: ButtonComponentProps) => {
  return (
    <Button className={className} onClick={onClicked} variant={variant}>
      {label}
    </Button>
  );
};

export default ButtonComponent;
