import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

export const NoteState = (props) => {
  const s1 = {
    name: "Rahul",
    class: "1st",
  };
  const [state, setState] = useState(s1);
  const Update = () => {
    setTimeout(() => {
      setState({
        name: "Rohit",
        class: "3rd",
      });
    }, 3000);
  };
  return (
    <NoteContext.Provider value={{ state, Update }}>
      {props.children}
    </NoteContext.Provider>
  );
};
