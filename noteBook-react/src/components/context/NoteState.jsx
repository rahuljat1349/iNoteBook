import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const initialNotes = [
  {
    _id: "65a3a34636ae88d024069ccd",
    user: "659e3bfe471d0f59f2bd1b0f",
    title: "books to read",
    description: " pschycology of money",
    tag: "study",
    date: "2024-01-14T09:03:02.041Z",
    __v: 0,
  },
  {
    _id: "65a3a36c36ae88d024069ccf",
    user: "659e3bfe471d0f59f2bd1b0f",
    title: "shopping list",
    description: " books,pen,eraser",
    tag: "study",
    date: "2024-01-14T09:03:40.558Z",
    __v: 0,
  },
];

export const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes)
 
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
