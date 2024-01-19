import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { AddCircle, Edit } from "@mui/icons-material";
import Form from "./Form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Addnote({ id, btnTitle, func, element,heading }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {element === "edit" ? (
        <Edit onClick={handleClickOpen}></Edit>
      ) : (
        <div
          onClick={handleClickOpen}
          className="w-72 flex border-dotted border-gray-800 border-2 hover:bg-slate-800 hover:border-white duration-200 cursor-pointer items-center justify-center bg-slate-600 h-52"
        >
          <div className="flex gap-1 flex-col items-center">
            <h3>Add a Note</h3>
            <br />
            <AddCircle />
          </div>
        </div>
      )}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {heading}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="bg-slate-600" dividers>
          <Form id={id} function={func} btnTitle={btnTitle} />
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
