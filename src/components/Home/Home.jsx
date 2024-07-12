import { useContext, useEffect, useState } from "react";
import AlertBar from "./Alert";
import noteContext from "../context/noteContext";

import NotesContainer from "./NotesContainer";
import { useNavigate } from "react-router-dom";

export default function Home() {
    let navigate = useNavigate();
    const context = useContext(noteContext)
    const {getNotes} = context; 

    useEffect(() => {
      if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
        getNotes();
      } else {
        navigate("/login");
      }
    }, []);
  return (
    <>
      <div className="h-12 px-6 sm:px-10 lg:px-80 w-full fixed  py-3">
        <AlertBar />
      </div>
      <NotesContainer />
    </>
  );
}
