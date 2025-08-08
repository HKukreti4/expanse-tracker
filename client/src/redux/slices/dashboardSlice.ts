import { createSlice } from "@reduxjs/toolkit";

type dashboardinitialState = {
  isVisible: boolean;
};
const initialState: dashboardinitialState = {
  isVisible: false,
};
const toggleDashboardSlice = createSlice({
  name: "sidebarToggler",
  initialState,
  reducers: {
    openDashboard(state) {
      state.isVisible = true;
    },
    closeDashboard(state) {
      state.isVisible = false;
    },
  },
});

export const { openDashboard, closeDashboard } = toggleDashboardSlice.actions;
export default toggleDashboardSlice.reducer;
