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
import { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

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
  const [board, setChange] = useState(0)
  // const boardDataFromBackEnd = [
  //   {
  //     id: [uuid()],
  //     title: "Super Projet 1",
  //   },
  //   {
  //     id: [uuid()],
  //     title: "Super Projet 2",
  //   },
  // ];
  const userInfo = Cookies.get("user").split("_");
  const ownerId = userInfo[0];

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    Axios.post("http://192.168.76.76:3001/api/boards/get", {
      ownerId: ownerId,
    }).then((response, err) => {
      setBoards(response.data);
    })

  }, [ownerId, board])

  // const [boards, setBoards] = useState(boardDataFromBackEnd);
  const handleDelete = (id) => {
    Axios.post("http://192.168.76.76:3001/api/boards/delete", {
      id: id,
    }).then((response, err) => {
      if (response.status !== 200) {
        alert("Erreur de suppréssion");
      }
    })
    const deletedElementIndex = boards.findIndex((value) => value.id === id);

    setBoards((prevState) => {
      prevState.splice(deletedElementIndex, 1);
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
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <CardActionArea onClick={() => history.push("/Home/" + value.id)}>
                        <Typography align="center">{value.name}</Typography>
                      </CardActionArea>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(value.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
          <Grid item xs={4}>
            <AddBoardForm boards={boards} setBoards={setBoards} setChange={setChange} />
            {/* <Typography>Créer un tableau</Typography> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SelectBoard;
