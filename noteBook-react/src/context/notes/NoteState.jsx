import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

export const NoteState = (props) => {
 
  return (
    <NoteContext.Provider value={}>
      {props.children}
    </NoteContext.Provider>
  );
};