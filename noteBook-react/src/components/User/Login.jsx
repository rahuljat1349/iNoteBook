import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (response.status === 200) {
      console.log("Success");
      localStorage.setItem("token", json.authToken);
      navigate("/Home")

    } else {
      console.log("Invalid email or password");
    }
  };
  const onChange = (e) => [
    setCredentials({ ...credentials, [e.target.name]: e.target.value }),
  ];
  return (
    <>
      <div className=" w-full flex-col gap-2 items-center justify-center flex p-16">
        <form
          onSubmit={handleSubmit}
          className="flex border-[1px] border-solid border-gray-700 flex-col gap-3 bg-slate-800 p-4 w-80 md:w-96"
        >
          <h1 className="text-center text-3xl">Login</h1>

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
          <label htmlFor="password">Enter Your Password*</label>

          <input
            onChange={onChange}
            value={credentials.password}
            name="password"
            id="password"
            className="p-2  rounded-sm bg-slate-500 outline-none "
            placeholder="password"
            required
            type="password"
          />
          <div>
            <input className=" mr-2" type="checkbox" />
            <span>Remember me</span>
            <a className="float-right text-blue-500" href="">
              forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="p-2 duration-200 hover:bg-blue-700 rounded-sm bg-blue-500 outline-none "
          >
            Submit
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <a className="text-blue-500" href="">
            SignUp
          </a>{" "}
          here.
        </p>
      </div>
    </>
  );
}
