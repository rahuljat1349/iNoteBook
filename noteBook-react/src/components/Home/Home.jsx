import React, { useContext, useEffect } from "react";
import Form from "./Form";
import NotesContainer from "./NotesContainer";

// import noteContext from "../context/notes/noteContext";

export default function Home() {
  return (
    <>
     
      {/* form here */}
      <Form />   

      {/* notes container here */}
      <NotesContainer/>
    </>
  );
}
