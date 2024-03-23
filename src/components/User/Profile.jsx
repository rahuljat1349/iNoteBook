import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/joy/Button";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
const url = import.meta.env.VITE_API_URL;

import noteContext from "../context/noteContext";

import Deletemodal from "../Home/Deletemodal";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  const context = useContext(noteContext);
  const { handleAlert } = context;
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
  });
  const getUserInfo = async () => {
    try {
      const response = await fetch(`${url}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCredentials({ email: data.email, name: data.name });
      } else {
        // Handle error case
        console.error("Error fetching user info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token") && !sessionStorage.getItem("token")) {
      navigate("/login");
    }
    getUserInfo();
  }, []);
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            bgcolor: "#121212",
            p: 16,
            width: "100%",
            height: ["92vh"],
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={300}
            height={300}
          />
        </Box>
      ) : (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <div className="bg-slate-600 flex flex-col gap-4 justify-between  p-4 font-bold border-[2px] border-solid border-blue-500 h-[30vh]">
            <div className="w-full flex justify-center items-center hover:bg-zinc-800 cursor-pointer bg-zinc-900  ">
              <img className="rounded-full" src="" alt="image" />
            </div>

            <div className="flex gap-2">
              NAME <span>{credentials.name} </span>
            </div>
            <div className="flex gap-2">
              EMAIL <span>{credentials.email} </span>
            </div>
            {/* deletemodal */}
            <Deletemodal
              id={"logout"}
              delMsg={
                "This will Remove your Account from Browser, You'll have to Re Enter your Email and Password to Login"
              }
              delBtn={"Log Me Out"}
            />

          </div>
        </div>
      )}
    </>
  );
}
