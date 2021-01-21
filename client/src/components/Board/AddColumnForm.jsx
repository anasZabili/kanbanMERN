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
import Axios from "axios";
import { useParams } from "react-router-dom";

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

const AddColumnForm = ({ setColumns, columns }) => {
  const classes = useStyles();
  const [revealForm, setRevealForm] = useState(false);
  const [newColumn, setNewColumn] = useState("");
  const { boardId } = useParams();
  const handleChange = (e) => {
    setNewColumn(e.target.value);
  };
  const handleOnClick = () => {
    if (!newColumn) return;
    let maxPosition = 0;
    for (let index = 0; index < columns.length; index++) {
      maxPosition =
      columns[index].position > maxPosition ? columns[index].position : maxPosition;
    }
    Axios.post("http://localhost:3001/api/taskColumn/insert", {
      boardId: boardId,
      name: newColumn,
      position: maxPosition === 0 ? 0 : maxPosition + 1,
    }).then((response, err) => {
      setColumns((prevState) => {
        return [
          ...prevState,
          {
            id: [uuid()],
            name: newColumn,
            items: [],
            boardId: boardId,
            position: maxPosition === 0 ? 0 : maxPosition + 1 
          },
        ];
      });
      setNewColumn("");
      setRevealForm(false);
    });
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
