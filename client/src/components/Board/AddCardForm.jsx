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
import Cookies from "js-cookie";

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
    // Axios.post("/api/insert", {
    //   cardName: newCard,
    // }).then(() => {
    //   alert("successfully insert");
    // });
    let maxPosition = 0;
    for (let index = 0; index < column.items.length; index++) {
      maxPosition =
        column.items[index].position > maxPosition
          ? column.items[index].position
          : maxPosition;
    }
    Axios.post("http://localhost:3001/api/card/insert", {
      taskColumnId: columnId,
      personInChargeId: ownerId,
      content: newCard,
      position: maxPosition === 0 ? 0 : maxPosition + 1,
    }).then((response, err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        // DOUBLE douille a voir
        // setColumns((prevState) => {
        //   console.log(
        //     "🚀 ~ file: AddCardForm.jsx ~ line 72 ~ setColumns ~ prevState",
        //     prevState
        //   );
        //   const indexOfColumn = prevState.findIndex(
        //     (value) => column.id === value.id
        //   );
        //   prevState[indexOfColumn].items = [
        //     ...prevState[indexOfColumn].items,
        //     {
        //       id: [uuid()],
        //       content: newCard,
        //       position: maxPosition === 0 ? 0 : maxPosition + 1,
        //       personInChargeId: ownerId,
        //     },
        //   ];
        //   console.log("je set le new state avec la valeur :", prevState);
        //   return [...prevState];
        // });
        setCardChange((prevState) => prevState + 1)
      }
    });
    // setColumns((prevState) => {
    //   let maxIndex = 0;
    //   const index = prevState[columnId].items.map((value, index) =>
    //     value.index > maxIndex ? maxIndex = value.index : maxIndex
    //   );
    //   prevState[columnId].items.push({
    //     id: uuid(),
    //     content: newCard,
    //     index: maxIndex + 1,
    //   });
    //   return { ...prevState };
    // });
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
