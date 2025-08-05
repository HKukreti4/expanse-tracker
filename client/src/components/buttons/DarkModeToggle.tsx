import { useDispatch, useSelector } from "react-redux";
import { setDefaultTheme, toggleTheme } from "../../redux/slices/themeSlice";
import type { RootState } from "../../redux/store/store";
import { useEffect } from "react";

const DarkModeToggle = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  console.log(theme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDefaultTheme());
  }, [theme, dispatch]);
  return (
    <div className="flex items-center spacstatee-x-4">
      <button
        onClick={() => dispatch(toggleTheme())}
        className={`relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors
            ${theme == "dark" ? "justify-end" : "justify-start"} 
          flex items-center p-1`}
      >
        <div
          className={`w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform ${
            theme == "dark" ? "translate-x-0" : ""
          }`}
        ></div>
      </button>
    </div>
  );
};

export default DarkModeToggle;
