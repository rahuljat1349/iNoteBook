import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import Notes from "./Notes";
import Addnote from "./Addnote";
export default function NotesContainer({}) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, addNote } = context;


  return (
    <>
      <div className="w-full px-8 mb-4 mt-3 flex flex-wrap items-center justify-center gap-2">
        <Addnote
          element={""}
          func={addNote}
          btnTitle={"Add Note"}
          heading={"Add a Note"}
        />
        {notes.length === 0 && "No notes to display, Try adding a New Note."}
        {notes.map((note, index) => {
          return <Notes key={index} editNote={editNote} note={note} />;
        })}
      </div>
    </>
  );
}
