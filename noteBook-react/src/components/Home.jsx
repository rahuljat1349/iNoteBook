import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function Home() {
  const a = useContext(noteContext);
  useEffect(()=>{
    a.Update();
  },[])
  return (
    <>
      <div className="text-white">Home page</div>
      <p>this is about {a.state.name} and he is in class {a.state.class}</p>
    </>
  );
}
