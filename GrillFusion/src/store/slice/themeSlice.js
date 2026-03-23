import { createSlice } from "@reduxjs/toolkit";

//Const to get an intial state
const initialState = {
  theme: localStorage.getItem("bs-theme-fusion") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("bs-theme-fusion", state.theme);
      document.body.setAttribute("data-bs-theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
