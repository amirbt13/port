"use client";
import SwitchComponent from "@/components/UI/switch/SwitchComponent";
import { setMode } from "@/redux/darkmode/darkmodeSlice";
import { RootState } from "@/redux/store";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

const ThemeToggle = () => {
  const dispatch = useDispatch();

  const darkmode = useSelector((state: RootState) => state.darkmode.value);

  const changeCheckbox = (value: boolean) => {
    dispatch(setMode(value));
  };
  return (
    <div className=" flex items-center gap-2">
      <label>
        <MdOutlineLightMode size={darkmode ? 20 : 30} />
      </label>
      <SwitchComponent onCheckedChange={changeCheckbox} checked={darkmode} />
      <label>
        <MdNightlightRound size={darkmode ? 30 : 20} />
      </label>
    </div>
  );
};

export default ThemeToggle;
