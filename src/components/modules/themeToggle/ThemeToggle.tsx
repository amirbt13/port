"use client";

import SwitchComponent from "@/components/UI/switch/SwitchComponent";
import { setMode } from "@/redux/darkmode/darkmodeSlice";
import { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkmode = useSelector((state: RootState) => state.darkmode.value);

  return (
    <div className="flex min-h-11 items-center gap-1.5 rounded-xl px-1.5" aria-label="Color theme">
      <Sun size={15} className={darkmode ? "text-muted-foreground" : "text-foreground"} aria-hidden="true" />
      <SwitchComponent
        onCheckedChange={(value) => dispatch(setMode(value))}
        checked={darkmode}
        ariaLabel="Toggle dark mode"
      />
      <Moon size={15} className={darkmode ? "text-foreground" : "text-muted-foreground"} aria-hidden="true" />
    </div>
  );
};

export default ThemeToggle;
