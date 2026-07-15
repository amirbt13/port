import { IProject } from "@/types/project";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProjectState {
  projects: IProject[];
}

const initialState: IProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addBulkProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects.push(action.payload);
    },
  },
});

export const { addBulkProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
