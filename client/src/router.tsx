import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import {
  Home,
  DashboardHome,
  RootLayout,
  About,
  DashboardLayout,
  Auth,
} from "./index";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="" element={<RootLayout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
      </Route>
    </>
  )
);
