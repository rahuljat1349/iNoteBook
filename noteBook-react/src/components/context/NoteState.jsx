import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const initialNotes = [];

export const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes);
  const url = "http://localhost:8000";

  // feth all notes
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Handle Alert
  const handleAlert = (arg) => {};

  return (
    <NoteContext.Provider
      value={{
        notes,
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
