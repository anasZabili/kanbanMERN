import { Draggable } from "react-beautiful-dnd";
import { Grid, Paper, Typography, IconButton,  Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  typo: {
    padding: 10,
  },
  taskCard: {
    display: "inlineBlock",
    whiteSpace: 'nowrap',
  },
});

const TaskCard = ({ item, index }) => {
  const classes = useStyles();
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <Grid
            item
            xs={12}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper >
              <Box className={classes.taskCard}>
                <Typography className={classes.typo} variant="body2">
                  {item.content}
                </Typography>
                <IconButton>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
