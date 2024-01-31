import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/joy/Button";

import { useNavigate } from "react-router-dom";

export default function Logout() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="h-80 w-full justify-center items-center flex">
        <React.Fragment>
          <form
            className="flex flex-col justify-between border-solid gap-1 border-gray-500 border-[1px] h-36 m-2 bg-gray-800 p-4"
            action=""
          >
            <h1 className="text-2xl ">Are you sure you want to logout?</h1>
            <Button
              variant="outlined"
              color="danger"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </form>
        </React.Fragment>
      </div>
    </>
  );
}
