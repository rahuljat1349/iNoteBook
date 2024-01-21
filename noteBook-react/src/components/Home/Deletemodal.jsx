import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Deletemodal({ handleDelete }) {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <DeleteIcon onClick={() => setOpen(true)} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog  variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Are you absolutely sure?
          </DialogTitle>
          <Divider />
          <DialogContent>
            This action cannot be undone. This will permanently delete your
            Note and remove your data from our servers.
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                setOpen(false);
                handleDelete();
              }}
            >
              Delete Note
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
