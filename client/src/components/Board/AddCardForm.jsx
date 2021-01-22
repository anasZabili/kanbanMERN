import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Delete } from "@material-ui/icons";
import Axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  textfield: {
    flexGrow: 1,
    margin: 4,
  },
  button: {
    marginLeft: 4,
    padding: 5,
  },
}));

const AddCardForm = ({ columnId, setColumns, column, cardChange, setCardChange }) => {
  const classes = useStyles();
  const [newCard, setNewCard] = useState("");
  const [revealForm, setRevealForm] = useState(false);
  const handleReveal = () => {
    setRevealForm(true);
  };
  const handleChange = (e) => {
    setNewCard(e.target.value);
  };
  const handleDelete = () => {
    setRevealForm(false);
  };
  const userInfo = Cookies.get("user").split("_");
  const ownerId = userInfo[0];

  const handleOnClick = () => {
    if (!newCard) return;
    let maxPosition = 0;
    for (let index = 0; index < column.items.length; index++) {
      maxPosition =
        column.items[index].position > maxPosition
          ? column.items[index].position
          : maxPosition;
    }
    Axios.post("http://192.168.76.76:3001/api/card/insert", {
      taskColumnId: columnId,
      personInChargeId: ownerId,
      content: newCard,
      position: maxPosition === 0 ? 0 : maxPosition + 1,
    }).then((response, err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        setCardChange((prevState) => prevState + 1)
      }
    });
    setRevealForm(false);
    setNewCard("");
  };

  return (
    <>
      {!revealForm ? (
        <Box onClick={handleReveal}>
          <Typography>+ Ajouter une carte</Typography>
        </Box>
      ) : (
          <>
            <TextField
              className={classes.textfield}
              id="add_card"
              label="Ajouter une autre carte"
              multiline
              rowsMax={4}
              value={newCard}
              onChange={handleChange}
              variant="outlined"
            />
            <Button
              onClick={handleOnClick}
              size="small"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Ajouter une carte
          </Button>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </>
        )}
    </>
  );
};

export default AddCardForm;
