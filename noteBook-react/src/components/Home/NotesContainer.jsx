import React from "react";
import Notes from "./Notes";

export default function NotesContainer() {
  return (
    <>
      <h1 className="text-3xl my-6 text-center duration-200 text-white font-semibold">
        Your Notes
      </h1>
      <div className="w-full px-8 mb-2 flex flex-wrap items-center justify-center gap-3">
        <Notes />
      </div>
    </>
  );
}
