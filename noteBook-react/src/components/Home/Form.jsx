import React, { useState } from "react";
import Alert from "./Alert";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function Form() {

  return (
    <>
      {/* main container */}
      <div className="flex justify-center items-center">
        <div className="w-80 border-dotted border-2 border-gray m-4 p-4 gap-2 flex flex-col justify-center items-center">
          <h1 className="text-lg shadow-md shadow-black rounded-lg"> Add a Note</h1>
          <div className="flex">
            <input
              className="outline-none w-52 rounded-l p-2 bg-gray-700"
              placeholder="Title.."
              type="text"
            />
            <select className="px-2 rounded-r w-20 text-xs outline-none bg-blue-600">
              <option value="">Tag</option>
              <option value="General">General</option>
              <option value="Relations">Relations</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
            </select>
          </div>
          <textarea
            className="w-72 rounded outline-none p-2 bg-gray-700"
            name=""
            id=""
            placeholder="Description.."
            cols=""
            rows="3"
          ></textarea>
          <button className="bg-blue-600 rounded p-2 w-full">Save</button>
        </div>
      </div>
    </>
  );
}
