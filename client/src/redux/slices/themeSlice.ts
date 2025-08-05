import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "dark",
};
console.log(initialState);
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme == "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme);
      document.documentElement.className = state.theme;
    },
    setDefaultTheme(state) {
      state.theme = localStorage.getItem("theme") || "dark";
      document.documentElement.className =
        localStorage.getItem("theme") || "dark";
    },
  },
});

export const { toggleTheme, setDefaultTheme } = themeSlice.actions;
export default themeSlice.reducer;
