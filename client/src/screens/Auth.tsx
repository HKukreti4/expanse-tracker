import { useLocation, useNavigate } from "react-router-dom";
import Loginform from "../components/auth/Loginform";
import RegisterForm from "../components/auth/RegisterForm";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getUserThunk } from "../redux/auth/authThunk";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (user) {
          const result = await dispatch(getUserThunk(user)).unwrap();
          if (result) {
            navigate("/dashboard");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    verifyUser();
  }, []);
  return (
    <div className="dark:bg-secondary-800 bg-white text-black dark:text-white rounded-xl h-[calc(100vh-16px)] m-2 overflow-hidden flex  gap-4  p-4">
      <div className="left flex-1 lg:flex-2 flex items-center justify-center  rounded-xl">
        {location.pathname == "/login" ? <Loginform /> : <RegisterForm />}
      </div>
      <div className="right flex-col  flex-1 bg-white shadow-md dark:bg-black/20 rounded-xl hidden md:flex items-center  justify-center">
        <div className="flex flex-col gap-6">
          <div className="px-8 text-xl">
            <h3 className="text-primary-400">
              Effortlessly manage your expanse habbits
            </h3>
            <p className="text-sm">
              Login to access your CRM dashboard and manage your team
            </p>
          </div>
          <div className="px-8 py-2 border-none">
            {/* <img
              src="https://imgs.search.brave.com/BCjlPsdR1p-mdRAgI7SAKSWNziXvC_OMuBVzlz6W4-M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zcGVj/a3lib3kuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzA3/L2FkbWluLWRhc2hi/b2FyZC11aS11eC13/ZWItZGVzaWduLWlu/c3BpcmF0aW9uLTEx/LmpwZw"
              alt=""
              className="bg-blend-color-burn bg-primary-400 rounded-xl"
            /> */}
            {theme == "light" ? (
              <img
                src={"/dashboard-white.png"}
                alt=""
                className=" bg-primary-400 rounded-xl"
              />
            ) : (
              <img
                src={"/dashboard-black.png"}
                alt=""
                className=" bg-primary-400 rounded-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
