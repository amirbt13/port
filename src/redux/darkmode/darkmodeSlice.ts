import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DarkModeState {
  value: boolean;
}

const initialState: DarkModeState = {
  value: false, // Default state
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.value = !state.value;
    },
    setMode: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleMode, setMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
