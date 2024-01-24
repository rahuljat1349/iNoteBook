import { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import noteContext from "../context/noteContext";
import Addnote from "./Addnote";
import Deletemodal from "./Deletemodal";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Notes(props) {
  const context = useContext(noteContext);
  const { deleteNote, addNote, editNote } = context;
  const handleDelete = () => {
    deleteNote(props.note._id);
  };
  const handleUpdate = () => {
    // console.log(initialValues);
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
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
          <IconButton>
            <Deletemodal handleDelete={handleDelete} />
          </IconButton>
          <IconButton onClick={handleUpdate}>
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
