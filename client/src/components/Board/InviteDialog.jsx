import {
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useState } from 'react'

const InviteDialog = ({ open, handleClose, handleClick }) => {
  const [mail, setMail] = useState("");
  const handleChange = (e) => {
    setMail(e.target.value);
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Inviter un membre sur votre projet</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pour inviter un membre veuillez renseigner son adresse mail (adresse correspondant à l'adresse associée à son compte Trello)
        </DialogContentText>
        <TextField
          autoFocus
          onChange={handleChange}
          margin="dense"
          id="mail"
          label="Addresse Mail"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Annuler
        </Button>
        <Button onClick={() => {handleClick(mail); handleClose()}} color="primary">
          Inviter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteDialog;
