"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleMode } from "@/redux/darkmode/darkmodeSlice";
import store, { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const SyncDarkMode = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkmode.value);
  useEffect(() => {
    // Check if dark mode setting exists in localStorage
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting) {
      const isDarkMode = JSON.parse(darkModeSetting).value;

      // Dispatch an action to update the Redux state if needed
      // console.log(isDarkMode);
      if (isDarkMode) {
        dispatch(toggleMode());
      } else {
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Subscribe to store changes and update localStorage
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      // console.log(state.darkMode);
      localStorage.setItem("darkMode", JSON.stringify(state.darkmode));
    });
    return () => unsubscribe();
  }, []);

  return null; // This component does not render anything
};

export default SyncDarkMode;
