import { useContext, useEffect } from "react";

import noteContext from "../context/noteContext";
import Notes from "./Notes";
import Addnote from "./Addnote";

export default function NotesContainer(props) {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote,addNote } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <h1 className="text-3xl my-6 text-center duration-200 text-white font-semibold">
        Your Notes
      </h1>
      <div className="w-full px-8 mb-2 flex flex-wrap items-center justify-center gap-3">
        <Addnote

          element={""}
          func={addNote}
          btnTitle={"Add Note"}
          heading={"Add a Note"}
        />
        {notes.map((note, index) => {
          return <Notes key={index} editNote={editNote} note={note} />;
        })}
      </div>
    </>
  );
}
