import React, { useState } from "react";
// import Alert from "./Alert";
import { useContext } from "react";
import noteContext from "../context/noteContext";

export default function Form({
  id,
  handleClose,
  func,
  btnTitle,
  initialValues,
}) {
  const context = useContext(noteContext);
  const { handleAlert } = context;

  const [note, setNote] = useState({
    title: initialValues ? initialValues.title : "",
    description: initialValues ? initialValues.description : "",
    tag: initialValues && initialValues.tag,
  });

  const handleClick = (e) => {
    e.preventDefault();

    if (id !== null && id !== undefined) {
      func(id, note.title, note.description, note.tag, handleClose);
      if (note.title.length > 2 && note.description.length > 4) {
        handleAlert("Your note was updated successfully", "success");
      } else {
        handleAlert("Please enter a valid Title or Description", "info");
      }
    } else {
      func(note.title, note.description, note.tag, handleClose);
      if (note.title.length > 2 && note.description.length > 4) {
        handleAlert("Your note was added successfully", "success");
      } else {
        handleAlert("Please enter a valid Title or Description", "info");
      }
    }
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* main container */}
      <div className="flex  text-white justify-center items-center">
        <form className="w-80 m-4 p-4 gap-2 flex flex-col justify-center items-center">
          <div className="flex">
            <input
              required
              value={note.title}
              onChange={onChange}
              name="title"
              id="title"
              className="outline-none duration-200 focus:outline-blue-500 w-52 rounded-l p-2 bg-gray-700"
              placeholder="Title.."
              type="text"
            />
            <select
              value={note.tag}
              name="tag"
              id="tag"
              onChange={onChange}
              className="px-2 focus:outline-blue-500 duration-200 rounded-r w-20 text-xs outline-none bg-blue-600"
            >
              <option value="">Tag</option>
              <option value="General">General</option>
              <option value="Personal">Personal</option>
              <option value="Relations">Relations</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
            </select>
          </div>
          <textarea
            required
            value={note.description}
            onChange={onChange}
            className="w-72 rounded focus:outline-blue-500 duration-200 outline-none p-2 bg-gray-700"
            name="description"
            id="description"
            placeholder="Description.."
            cols=""
            rows="3"
          ></textarea>

          <button
            onClick={handleClick}
            className="bg-blue-600 active:bg-blue-900 rounded p-2 w-full"
          >
            {btnTitle}
          </button>
        </form>
      </div>
    </>
  );
}
