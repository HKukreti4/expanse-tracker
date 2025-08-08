import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDefaultTheme } from "../redux/slices/themeSlice";

const RootLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDefaultTheme());
  }, [dispatch]);
  return (
    <div className="dark:bg-black/10">
      <header>
        <Navbar />
      </header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
