import React, { useState } from "react";
import Titleinput from "./Titleinput";
import Textarea from "./TextArea";
import Alert from "./Alert";
import Taginput from "./Taginput";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function Form() {
  const [display, setDisplay] = useState("hidden");

  return (
    <>
      <div className="w-full text-center p-4 flex justify-center">
        <div className="p-4 border-dotted border-slate-600 border-2">
          <div className={`${display === ""?"hidden":""} w-80 py-4`}>
            <Box onClick={()=>setDisplay("")} sx={{ "& > :not(style)": { m: 1 } }}>
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Box>
          </div>
          <h1 className="text-3xl mb-4 duration-200 text-gray-500 font-semibold">Add a Note</h1>
          <div className={`flex ${display} flex-col gap-4`}>
            <div className="flex items-center max-w-80">
              <Titleinput />
              <Taginput />
            </div>
            <Textarea />
            <Alert />
          </div>
        </div>
      </div>
    </>
  );
}
