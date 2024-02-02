import * as React from "react";
import { useContext, useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Deletemodal({ noteId, delMsg, delBtn, id }) {
  const context = useContext(noteContext);
  const { deleteNote, handleAlert } = context;
  const handleDelete = () => {
    deleteNote(noteId);
    handleAlert("Your note was deleted successfully.", "success");
  };
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      {id == "delete" && <DeleteIcon onClick={() => setOpen(true)} />}
      {id == "logout" && (
        <Button onClick={() => setOpen(true)} color="danger">
          Logout
        </Button>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Are you absolutely sure?
          </DialogTitle>
          <Divider />
          <DialogContent>{delMsg}</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                setOpen(false);
                if (id == "delete") {
                  handleDelete();
                } else if (id == "logout") {
                  localStorage.removeItem("token");
                  navigate("/login");
                  handleAlert("You Are Logged Out", "info");
                }
              }}
            >
              {delBtn}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
