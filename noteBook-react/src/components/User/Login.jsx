import React from "react";

export default function Login() {
  return (
    <>
      <div className=" w-full flex-col items-center justify-center flex p-16">
        <form
          className="flex border-[1px] border-solid border-gray-700 flex-col gap-3 bg-slate-800 p-4 w-80 md:w-96"
          action=""
        >
          <h1 className="text-center text-3xl">Login</h1>
         
          <label htmlFor="email">Your Email Address*</label>
          <input
            id="email"
            className="p-2  rounded-sm bg-slate-500 outline-none "
            placeholder="example@email.com"
            required
            type="email"
          />
          <label htmlFor="password">Create a password*</label>

          <input
            id="password"
            className="p-2  rounded-sm bg-slate-500 outline-none "
            placeholder="pass****"
            required
            type="password"
          />
          <div>
            <input className=" mr-2" type="checkbox" />
            <span>Remember me</span>
            <a className="float-right text-blue-500" href="">forgot password?</a>
          </div>
          <button className="p-2 duration-200 hover:bg-blue-700 rounded-sm bg-blue-500 outline-none ">
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
