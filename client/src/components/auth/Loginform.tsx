import { NavLink, useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
// import DarkModeToggle from "../buttons/DarkModeToggle";
import { FcGoogle } from "react-icons/fc";
import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { loginUserThunk } from "../../redux/auth/authThunk";

interface LoginData {
  email: string;
  password: string;
}
const Loginform = () => {
  const [loginData, setloginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const errorMsg = useAppSelector((state) => state.auth.errmsg);
  const loading = useAppSelector((state) => state.auth.buttonLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUserThunk(loginData));
      if (result) {
        navigate("/dashboard");
        setloginData({ email: "", password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-center flex flex-col gap-2">
      <h3 className="md:text-3xl text-md font-bold text-primary-400 capitalize">
        Welcome back
      </h3>
      <p>Enter your email and password to access the account</p>
      {/* <DarkModeToggle /> */}

      <form
        onSubmit={(e) => submitHandler(e)}
        className="text-left flex mt-5 flex-col gap-4"
      >
        {errorMsg && (
          <p className="border-1 rounded-md border-red-400 text-red-400 py-2 text-center">
            {errorMsg}
          </p>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            placeholder="Enter email"
            onChange={(e) =>
              setloginData({ ...loginData, [e.target.name]: e.target.value })
            }
            className="border-[1px] dark:border-white/20 border-black/10 bg-white dark:bg-transparent focus:border-primary-400 outline-none px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={(e) =>
              setloginData({ ...loginData, [e.target.name]: e.target.value })
            }
            placeholder="Enter password"
            className="border-[1px] dark:border-white/20 border-black/10 bg-white dark:bg-transparent focus:border-primary-400 outline-none px-4 py-2 rounded-md"
          />
        </div>
        {loading ? (
          <Button
            type="button"
            className="bg-primary-500 cursor-not-allowed text-white rounded-md py-2"
          >
            Loading ...
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-primary-500 text-white rounded-md py-2"
          >
            Login
          </Button>
        )}
      </form>
      <div className="flex items-center gap-2">
        <span className="flex-1 dark:bg-white bg-black h-[0.5px]"></span>
        <span>Or login with</span>
        <span className="flex-1 dark:bg-white  bg-black h-[0.5px]"></span>
      </div>
      <button className="text-center cursor-pointer flex justify-center w-2/5 p-1 mx-auto items-center gap-2 rounded-2xl border-primary-400 border-[1px] ">
        <FcGoogle /> Google
      </button>
      <p>
        Don't have an accout ?{" "}
        <NavLink to={"/register"} className="text-primary-400">
          Register Now
        </NavLink>
      </p>
    </div>
  );
};

export default Loginform;
