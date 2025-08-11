import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import { RootLayout, DashboardLayout, Auth } from "./index";

// Lazy-loaded screens
const About = lazy(() => import("./screens/About"));
const Home = lazy(() => import("./screens/Home"));
const DashboardHome = lazy(() => import("./screens/dashboard/DashboardHome"));
const Categories = lazy(() => import("./screens/dashboard/Categories"));
const Income = lazy(() => import("./screens/dashboard/Income"));
const Expanse = lazy(() => import("./screens/dashboard/Expanse"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route path="login" element={<Auth />} />
        <Route path="register" element={<Auth />} />
        <Route path="" element={<RootLayout />}>
          <Route
            path=""
            element={
              <Suspense fallback="Loading...">
                <Home />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback="Loading...">
                <About />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path="/" element={<DashboardLayout />}>
        <Route
          path="dashboard"
          element={
            <Suspense fallback="Loading...">
              <DashboardHome />
            </Suspense>
          }
        />
        <Route
          path="categories"
          element={
            <Suspense fallback="Loading...">
              <Categories />
            </Suspense>
          }
        />
        <Route
          path="income"
          element={
            <Suspense fallback="Loading...">
              <Income />
            </Suspense>
          }
        />
        <Route
          path="expanse"
          element={
            <Suspense fallback="Loading...">
              <Expanse />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);
