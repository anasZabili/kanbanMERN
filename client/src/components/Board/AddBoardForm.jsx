import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { v4 as uuid } from "uuid";

const AddBoardForm = ({ setBoards, boards }) => {
  const [newBoard, setNewBoard] = useState("");
  const [revealForm, setRevealForm] = useState(false);

  const handleReveal = () => {
    setRevealForm(true);
  };
  const handleDelete = () => {
    setRevealForm(false);
  };
  const handleOnChange = (e) => {
    setNewBoard(e.target.value);
  }
  const handleOnClick = () => {
    if (!newBoard) return;
    setBoards((prevState) => {
      return [
        ...prevState,
        {
          id: [uuid()],
          title: newBoard,
        },
      ];
    });
    setNewBoard("");
    handleDelete();
  };
  return (
    <>
      {!revealForm ? (
        <Button onClick={handleReveal}>
          <Typography>+ Créer un tableau</Typography>
        </Button>
      ) : (
        <>
          <TextField
            // className={classes.textfield}
            id="add_board"
            label="Ajouter un titre au tableau"
            multiline
            rowsMax={4}
            value={newBoard}
            onChange={handleOnChange}
            variant="outlined"
          />
          <Button
            // size='small'
            variant="contained"
            color="primary"
            onClick={handleOnClick}
            // className={classes.button}
          >
            Créer un tableau
          </Button>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </>
      )}
    </>
  );
};

export default AddBoardForm;
