import { configureStore } from "@reduxjs/toolkit";

import darkmodeReducer from "./darkmode/darkmodeSlice";
import projectsReducer from "./projects/projectsSlice";

const store = configureStore({
  reducer: {
    darkmode: darkmodeReducer,
    projects: projectsReducer,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
