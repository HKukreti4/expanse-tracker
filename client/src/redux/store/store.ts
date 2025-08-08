import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/themeSlice";
import toggleDashboardReducer from "../slices/dashboardSlice";
import authReducer from "../auth/authSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebarToggler: toggleDashboardReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
