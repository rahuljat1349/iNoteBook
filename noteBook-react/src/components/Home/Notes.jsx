import { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import noteContext from "../context/noteContext";
import Addnote from "./Addnote";
import Deletemodal from "./Deletemodal";
import Alert from "./Alert";

export default function Notes(props) {
  const [checked, setChecked] = useState(props.note.check);
  const context = useContext(noteContext);
  const { deleteNote, addNote, editNote, editFavorite } = context;
  const handleDelete = () => {
    deleteNote(props.note._id);
  };
  const handleChecked = async () => {
    const newChecked = !checked;
    setChecked(newChecked);
    await editFavorite(props.note._id, newChecked);
  };
  const initialValues = {
    id: props.note._id,
    title: props.note.title,
    description: props.note.description,
    tag: props.note.tag,
  };
  return (
    <>
      <Card className="text-wrap max-w-24" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.note.tag}
          </Typography>
          <Typography variant="h5" component="div">
            {props.note.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.note.date.slice(0, 10)}
          </Typography>
          <Typography variant="body2">
            {props.note.description}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Alert
            alertMsg={checked ? "Added to favorites." : "Removed from favorites."}
            handleChecked={handleChecked}
            checked={checked}
          />

          <IconButton>
            <Deletemodal handleDelete={handleDelete} />
          </IconButton>
          <IconButton>
            <Addnote
              initialValues={initialValues}
              element={"edit"}
              func={editNote}
              id={props.note._id}
              btnTitle={"SAVE CHANGES"}
              heading={"Edit Note"}
            />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
