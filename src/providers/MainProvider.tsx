("");
import SyncDarkMode from "@/utils/SyncDarkMode";
import React from "react";
import ReduxProvider from "./redux/ReduxProvider";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProvider>
        <SyncDarkMode />
        {children}
      </ReduxProvider>
    </>
  );
};

export default MainProvider;
