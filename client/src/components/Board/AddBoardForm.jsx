import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import Axios from 'axios'
import Cookies from 'js-cookie'

const AddBoardForm = ({ setBoards, boards, setChange }) => {
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
  };
  const userInfo = Cookies.get("user").split("_");
  const ownerId = userInfo[0];
  const handleOnClick = () => {
    if (!newBoard) return;
    Axios.post("http://192.168.76.76:3001/api/boards/insert", {
      name: newBoard,
      ownerId: ownerId,
    }).then((response, err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        setBoards((prevState) => {
          return [
            ...prevState,
            {
              id: [uuid()],
              name: newBoard,
            },
          ];
        });
        setChange((prevState) => prevState + 1)
      }
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
              variant="contained"
              color="primary"
              onClick={handleOnClick}
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
