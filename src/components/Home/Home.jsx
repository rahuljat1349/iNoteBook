import { useState } from "react";
import AlertBar from "./Alert";

import NotesContainer from "./NotesContainer";

export default function Home() {
  return (
    <>
      <div className="h-12 px-6 sm:px-10 lg:px-80 w-full fixed  py-3">
        <AlertBar />
      </div>
      <NotesContainer />
    </>
  );
}
