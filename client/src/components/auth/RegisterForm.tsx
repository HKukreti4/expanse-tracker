import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./../buttons/Button";
import { useState, type FormEvent } from "react";
import { FaEye } from "react-icons/fa";
import { registerUserThunk } from "../../redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

type UserLoginData = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = () => {
  const [user, setUser] = useState<UserLoginData>({
    name: "",
    email: "",
    password: "",
  });
  const buttonLoading = useAppSelector((state) => state.auth.buttonLoading);
  const dispatch = useAppDispatch();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const result = await dispatch(registerUserThunk(user)).unwrap(); //unwrap gives typed result or throws
      if (result) {
        sessionStorage.setItem("user", JSON.stringify(result));
        navigate("/dashboard");
        setUser({ name: "", email: "", password: "" });
      } else {
        setErrorMsg("Registration failed");
      }
    } catch (error) {
      setErrorMsg(error as string);
    }
  };

  return (
    <div className="text-center flex flex-col gap-2">
      <h3 className="md:text-3xl text-md font-bold text-primary-400 capitalize">
        Create an Account
      </h3>
      <p>Join now to streamline your experience from day one</p>

      {errorMsg && (
        <p className="border-1 rounded-md border-red-400 text-red-400 py-2">
          {errorMsg}
        </p>
      )}

      <form
        className="text-left flex mt-5 flex-col gap-4"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="username"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            placeholder="Enter name"
            className="border-[1px] dark:border-white/20 border-black/10 bg-white dark:bg-transparent focus:border-primary-400 outline-none px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            placeholder="Enter email"
            className="border-[1px] dark:border-white/20 border-black/10 bg-white dark:bg-transparent focus:border-primary-400 outline-none px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, [e.target.name]: e.target.value })
            }
            placeholder="Enter password"
            className="border-[1px] dark:border-white/20 border-black/10 bg-white dark:bg-transparent focus:border-primary-400 outline-none px-4 py-2 rounded-md"
          />
          <span
            className="absolute top-10 right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FaEye />
          </span>
        </div>
        <Button
          type="submit"
          className="bg-primary-500 rounded-md cursor-pointer"
        >
          {buttonLoading ? "Loading ..." : "Register"}
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <span className="flex-1 bg-white h-[0.5px]"></span>
        <span>Or register with</span>
        <span className="flex-1 bg-white h-[0.5px]"></span>
      </div>

      <button className="text-center cursor-pointer flex justify-center w-2/5 p-1 mx-auto items-center gap-2 rounded-2xl border-primary-400 border-[1px]">
        <FcGoogle /> Google
      </button>

      <p>
        Already have an account ?
        <NavLink to={"/login"} className="text-primary-400 ms-1">
          Login
        </NavLink>
      </p>
    </div>
  );
};

export default RegisterForm;
