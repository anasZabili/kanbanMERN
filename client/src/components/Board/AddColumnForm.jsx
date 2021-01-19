import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
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

const AddColumnForm = ({ setColumns }) => {
  const classes = useStyles();
  const [revealForm, setRevealForm] = useState(false);
  const [newColumn, setNewColumn] = useState("");
  const handleChange = (e) => {
    setNewColumn(e.target.value);
  };
  const handleOnClick = () => {
    if (!newColumn) return;
    setColumns((prevState) => {
      return {
        ...prevState,
        [uuid()]: {
          name: newColumn,
          items: [],
        },
      };
    });
    setNewColumn("");
    setRevealForm(false);
  };
  const handleReveal = () => {
    setRevealForm(true);
  };
  const handleDelete = () => {
    setRevealForm(false);
  };

  return (
    <>
      {!revealForm ? (
        <Box onClick={handleReveal}>
          <Typography>+ Ajouter une autre listes</Typography>
        </Box>
      ) : (
        <>
          <TextField
            className={classes.textfield}
            id="add_column"
            label="Saisisser le titre de la liste"
            multiline
            rowsMax={4}
            value={newColumn}
            onChange={handleChange}
            variant="outlined"
          />
          <Button
            // size='small'
            onClick={handleOnClick}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Ajouter autre liste
          </Button>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </>
      )}
    </>
  );
};

export default AddColumnForm;
