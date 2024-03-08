import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const initialNotes = [];
const url = import.meta.env.VITE_API_URL;
export const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes);

  // feth all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")||sessionStorage.getItem("token"),
      },
      // body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(json.notes);
  };

  // Add a Note
  const addNote = async (title, description, tag, handleClose) => {
    // TODO: API call
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    if (response.ok) {
      setNotes(notes.concat(note.result));
      handleClose();
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag, handleClose) => {
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const updatedNote = await response.json();
    if (response.ok) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote : note))
      );
      handleClose();
    }
  };

  // edit favorites
  const editFavorite = async (id, check) => {
    const response = await fetch(`${url}/api/notes/updatefavorite/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ check }),
    });
    const updatedNote = await response.json();
    if (response.ok) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote : note))
      );
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Handle Alert
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

 const handleAlert = (Msg, Type) => {
   console.log("Setting alert state:", { Msg, Type });
   setAlert(true);
   setAlertMsg(Msg);
   setAlertType(Type);

   setTimeout(() => {
     setAlert(false);
   }, 10);
 };


  return (
    <NoteContext.Provider
      value={{
        notes,
        alert,
        alertType,
        alertMsg,
        addNote,
        editNote,
        deleteNote,
        getNotes,
        handleAlert,
        editFavorite,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
