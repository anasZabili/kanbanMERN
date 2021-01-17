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
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  textfield: {
    flexGrow: 1,
    margin: 4,
  },
  button: {
    marginLeft: 4,
    padding: 5,
    // height: 40
  },
}));

const AddCardForm = ({ columnId, setColumns }) => {
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

  const submitCard = () => {
    console.log(newCard);
    if (!newCard) return;
    // Axios.post("/api/insert", {
    //   cardName: newCard,
    // }).then(() => {
    //   alert("successfully insert");
    // });
    setColumns((prevState) => {
      let maxIndex = 0;
      const index = prevState[columnId].items.map((value, index) =>
        value.index > maxIndex ? maxIndex = value.index : maxIndex
      );
      prevState[columnId].items.push({
        id: uuid(),
        content: newCard,
        index: maxIndex + 1,
      });
      return { ...prevState };
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
            onClick={submitCard}
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
