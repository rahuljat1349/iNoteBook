import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import noteContext from "../context/noteContext";
import AlertBar from "../Home/Alert";

export default function SignUp() {
  const context = useContext(noteContext);
  const { handleAlert } = context;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [password, showPassword] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      handleAlert("You are already Logged in.", "success");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    try {
      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("token", json.authToken);
        navigate("/Home");
        handleAlert("Created account successfully.", "success");
      } else if (response.status == 409) {
        handleAlert("Email already exists", "warning");
      }
    } catch (error) {
      console.error("Error:", error);
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
      <div className=" w-full  flex-col gap-2 items-center justify-center flex p-16">
        <form
          onSubmit={handleSubmit}
          className="flex border-[1px] border-solid rounded-md border-gray-700 flex-col gap-3 bg-slate-800 p-4 w-80 md:w-96"
        >
          <h1 className="text-center font-bold text-3xl">SignUp</h1>

          <input
            onChange={onChange}
            value={credentials.email}
            name="email"
            id="email"
            className="p-2  rounded-md  font-semibold bg-slate-500 outline-none "
            placeholder="Enter Your Email"
            required
            type="email"
          />

          <input
            minLength={3}
            onChange={onChange}
            value={credentials.name}
            name="name"
            id="name"
            className="p-2  rounded-md  font-semibold bg-slate-500 outline-none "
            placeholder="Enter Your Full Name"
            required
            type="text"
          />

          <div className="flex">
            <input
              minLength={6}
              onChange={onChange}
              value={credentials.password}
              name="password"
              id="password"
              className="p-2 w-80 rounded-l-md font-semibold bg-slate-500 outline-none "
              placeholder="Create a Password"
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
              className="p-2  rounded-r-md bg-slate-500 outline-none "
            >
              {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <div>
            <input
              id="checkbox"
              className="cursor-pointer mr-2 bg-black"
              type="checkbox"
            />
            <label className="cursor-pointer" htmlFor="checkbox">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="p-2 duration-200 hover:bg-blue-700 rounded-md  font-semibold bg-blue-500 outline-none "
          >
            Create Account
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-500" to="/Login">
            Login
          </Link>{" "}
          here.
        </p>
      </div>
    </>
  );
}
