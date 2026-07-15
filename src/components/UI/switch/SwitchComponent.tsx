import { Switch } from "@/public/components/ui/switch";
import React from "react";

interface SwitchComponentProps {
  checked?: boolean;
  onCheckedChange: (value: boolean) => void;
}

const SwitchComponent = ({
  checked,
  onCheckedChange,
}: SwitchComponentProps) => {
  return (
    <Switch
      onCheckedChange={(value) => onCheckedChange(value)}
      checked={checked}
    />
  );
};

export default SwitchComponent;
