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
  const [notes, setNotes] = useState(initialNotes);
  // Add a Note
  const addNote = (title, description, tag) => {
    // TODO: API call
    console.log("adding a new note");
    const note = {
      _id: "65a3a36c36ae88d824069ccf",
      user: "659e3bfe471d5f59f2bd1b0f",
      title: title,
      description:description,
      tag: tag,
      date: "2024-01-14T09:03:50.558Z",
      __v: 0,
    };
    setNotes(notes.concat(note))
  };
  
  // Edit a Note
  const editNote = (id) => {};
  
  // Delete a Note
  const deleteNote = (id) => {};
  

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
