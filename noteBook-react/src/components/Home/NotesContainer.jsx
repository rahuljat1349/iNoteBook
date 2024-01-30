import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import Notes from "./Notes";
import Addnote from "./Addnote";
export default function NotesContainer({ handleAlert }) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, addNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
      console.log("getting token");
    } else {
      navigate("/login");
      console.log("not getting token");
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl my-6 text-center text-white font-semibold">
        Your Notes
      </h1>
      <div className="w-full px-8 mb-2  flex flex-wrap items-center justify-center gap-2">
        <Addnote
          handleAlert={handleAlert}
          element={""}
          func={addNote}
          btnTitle={"Add Note"}
          heading={"Add a Note"}
        />
        {notes.length === 0 && "No notes to display, Try adding a new note."}
        {notes.map((note, index) => {
          return (
            <Notes
              handleAlert={handleAlert}
              key={index}
              editNote={editNote}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}
