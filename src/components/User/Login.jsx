import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import noteContext from "../context/noteContext";
import AlertBar from "../Home/Alert";
const url = import.meta.env.VITE_API_URL;

export default function Login() {
  const context = useContext(noteContext);
  const { handleAlert } = context;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [password, showPassword] = useState(true);
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      navigate("/");
      handleAlert("You are already logged in.", "success");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await fetch(`${url}/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    try {
      if (response.ok) {
        const json = await response.json();
        check
        ? localStorage.setItem("token", json.authToken)
        : sessionStorage.setItem("token", json.authToken);
        navigate("/Home");
        handleAlert("Logged in successfully.", "success");
      } else {
        handleAlert("Invalid email or password.", "error");
        setLoading(false)
      }
    } catch (error) {
      
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="h-12 px-6 sm:px-10 lg:px-80 w-full fixed  py-3">
        <AlertBar />
      </div>
      <div className=" w-full flex-col gap-2 items-center justify-center flex p-16">
        <form
          onSubmit={handleSubmit}
          className="flex border-[1px] border-solid rounded-md border-gray-700 flex-col gap-3 bg-slate-800 p-4 w-80 md:w-96"
        >
          <h1 className="text-center font-bold text-3xl">Login</h1>

          <input
            onChange={onChange}
            value={credentials.email}
            name="email"
            id="email"
            className="p-3 focus:outline-blue-500 duration-200 rounded-md font-semibold bg-slate-500 outline-none "
            placeholder="Enter Your Email"
            required
            type="email"
          />

          <div className="flex">
            <input
              minLength={6}
              onChange={onChange}
              value={credentials.password}
              name="password"
              id="password"
              className="p-3 w-full focus:outline-blue-500 duration-200 rounded-md font-semibold bg-slate-500 outline-none "
              placeholder="Enter Your Password"
              required
              type={password ? "password" : "text"}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                showPassword((value) => {
                  return !value;
                });
              }}
              className="-ml-10 font-semibold bg-slate-500 outline-none "
            >
              {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <div>
            <input
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
              id="checkbox"
              className="cursor-pointer mr-2"
              type="checkbox"
            />
            <label className="cursor-pointer" htmlFor="checkbox">
              Remember me
            </label>
            <a className="float-right text-blue-500" href="">
              forgot password?
            </a>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="p-3 duration-200 disabled:bg-slate-400 hover:bg-blue-700 rounded-md font-semibold bg-blue-500 outline-none "
          >
            {loading?"Please wait..":"Continue"}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-500" to="/SignUp">
            SignUp
          </Link>{" "}
          here.
        </p>
      </div>
    </>
  );
}
