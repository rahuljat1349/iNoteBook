import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function SignUp() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [password, showPassword] = useState(true);

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
        console.log("Success");
        localStorage.setItem("token", json.authToken);
        navigate("/Home");
      } else {
        console.log("Invalid email or password");
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
      <div className=" w-full flex-col gap-2 items-center justify-center flex p-16">
        <form
          onSubmit={handleSubmit}
          className="flex border-[1px] border-solid border-gray-700 flex-col gap-3 bg-slate-800 p-4 w-80 md:w-96"
        >
          <h1 className="text-center text-3xl">SignUp</h1>

          <label htmlFor="email">Enter Your Email*</label>
          <input
            onChange={onChange}
            value={credentials.email}
            name="email"
            id="email"
            className="p-2  rounded-sm bg-slate-500 outline-none "
            placeholder="example@email.com"
            required
            type="email"
          />
          <label htmlFor="name">Enter Your Full Name*</label>
          <input
            onChange={onChange}
            value={credentials.name}
            name="name"
            id="name"
            className="p-2  rounded-sm bg-slate-500 outline-none "
            placeholder="Eg. 'Hitesh Choudhary'"
            required
            type="text"
          />
          <label htmlFor="password">Enter Your Password*</label>

          <div className="flex">
            <input
              onChange={onChange}
              value={credentials.password}
              name="password"
              id="password"
              className="p-2 w-80 rounded-l-sm bg-slate-500 outline-none "
              placeholder="password"
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
              className="p-2  rounded-r-sm bg-slate-500 outline-none "
            >
              {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
          <div>
            <input className=" mr-2" type="checkbox" />
            <span>Remember me</span>
          </div>
          <button
            type="submit"
            className="p-2 duration-200 hover:bg-blue-700 rounded-sm bg-blue-500 outline-none "
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
