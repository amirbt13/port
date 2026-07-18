import { Switch } from "@/public/components/ui/switch";
import React from "react";

interface SwitchComponentProps {
  checked?: boolean;
  onCheckedChange: (value: boolean) => void;
  ariaLabel?: string;
}

const SwitchComponent = ({
  checked,
  onCheckedChange,
  ariaLabel,
}: SwitchComponentProps) => {
  return (
    <Switch
      onCheckedChange={(value) => onCheckedChange(value)}
      checked={checked}
      aria-label={ariaLabel}
    />
  );
};

export default SwitchComponent;
