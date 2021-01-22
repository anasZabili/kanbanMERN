import { Draggable } from "react-beautiful-dnd";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Delete } from "@material-ui/icons";
import Axios from "axios";

const useStyles = makeStyles({
  typo: {
    padding: 10,
  },
  taskCard: {
    display: "inlineBlock",
    whiteSpace: "nowrap",
  },
  avatar: {
    width: "30px",
    height: "30px",
    float: 'right',
    clear: 'right',
    marginRight: 5,
  },
});

const TaskCard = ({ item, index, setCardChange }) => {
  console.log("🚀 ~ file: TaskCard.jsx ~ line 32 ~ TaskCard ~ item", item)
  const classes = useStyles();
  const handleOnDelete = (cardId) => {
    Axios.post("http://192.168.76.76:3001/api/card/delete", {
      cardId: cardId,
    }).then((response, err) => {
      if (response.status !== 200) {
        alert("Erreur de suppréssion");
      }
    });
    setCardChange((prevState) => prevState + 1);
  };
  return (
    <Draggable
      key={item.ID}
      draggableId={item?.ID?.toString() + "card"}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <Grid
            item
            xs={12}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper>
              <Grid container spacing={1}>
                <Grid item xs={9}>
                  <Typography className={classes.typo} variant="body2">
                    {item.CONTENT}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <IconButton
                    size="small"
                    onClick={() => handleOnDelete(item.ID)}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Avatar className={classes.avatar}>{item?.NAME?.charAt(0).toUpperCase() + item?.NAME?.charAt(1)}</Avatar>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
