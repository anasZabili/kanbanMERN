import { v4 as uuid } from "uuid";
import {
  Grid,
  Card,
  Typography,
  Box,
  Button,
  Link,
  CardActionArea,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import AddBoardForm from "../Board/AddBoardForm";
import Header from "./Header";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    marginTop: "100px",
  },
  card: {
    padding: "10px",
  },
}));

const SelectBoard = () => {
  const history = useHistory();
  const classes = useStyles();
  const boardDataFromBackEnd = [
    {
      id: [uuid()],
      title: "Super Projet 1",
    },
    {
      id: [uuid()],
      title: "Super Projet 2",
    },
  ];
  const [boards, setBoards] = useState(boardDataFromBackEnd);
  const handleDelete = (id) => {
    const deletedElementIndex = boards.findIndex((value) => (value.id === id));
    console.log("🚀 ~ file: index.jsx ~ line 45 ~ handleDelete ~ deletedElementIndex", deletedElementIndex)
    
    setBoards((prevState) => {
      prevState.splice(deletedElementIndex, 1);
      console.log("🚀 ~ file: index.jsx ~ line 47 ~ setBoards ~ prevState", prevState)
      return [...prevState];
    });
    // const NewBoards = {};
  };
  return (
    <>
      <Header></Header>
      <Box className={classes.appContainer} component="div">
        <Grid container spacing={3}>
          {boards.map((value, index) => {
            return (
              <Grid item xs={4} key={value.id}>
                {/* Todo remplacer par le bon truc quand j'aurais le back  (mettre le project name dans le lien*/}
                <Card className={classes.card}>
                  <CardActionArea onClick={() => history.push("/Home")}>
                    <Typography align="center">{value.title}</Typography>
                  </CardActionArea>
                  <IconButton onClick={() => handleDelete(value.id)}>
                    <Delete />
                  </IconButton>
                </Card>
              </Grid>
            );
          })}
          <Grid item xs={4}>
            <AddBoardForm boards={boards} setBoards={setBoards} />
            {/* <Typography>Créer un tableau</Typography> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SelectBoard;
