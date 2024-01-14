import React from "react";
import Titleinput from "./Titleinput";
import Textarea from "./TextArea";
import Alert from "./Alert";
import Taginput from "./Taginput";

export default function Form() {
  return (
    <>
      <div className="w-full p-4 flex justify-center">
        <div className="flex flex-col border-dotted border-slate-600 border-2 gap-4 p-4 ">
          <h1 className="text-3xl font-semibold">Add a Note</h1>
          <div className="flex items-center max-w-80">
            <Titleinput />
            <Taginput />
          </div>
          <Textarea />
          <Alert />
        </div>
      </div>
    </>
  );
}
