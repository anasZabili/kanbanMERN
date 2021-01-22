import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import Column from "./Column";
import AddColumnForm from "./AddColumnForm";
import Axios from "axios";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination, type } = result;
  if (type === "Card") {
    if (source.droppableId !== destination.droppableId) {
      const sourceIndex = columns.findIndex(
        (value) => value.id === parseInt(source.droppableId)
      );
      const destIndex = columns.findIndex(
        (value) => value.id === parseInt(destination.droppableId)
      );
      const sourceColumn = columns[sourceIndex];
      const destColumn = columns[destIndex];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      Axios.post("http://192.168.76.76:3001/api/card/update", {
        taskColumnId: destColumn.id,
        cardId: removed.id,
        position: destination.index
      }).then((response, err) => {
      })
      setColumns((prevState) => {
        prevState[sourceIndex] = {
          ...sourceColumn,
          items: sourceItems,
        };
        prevState[destIndex] = {
          ...destColumn,
          items: destItems,
        };
        return [...prevState];
      });
    } else {
      const sourceIndex = columns.findIndex(
        (value) => value.id === parseInt(source.droppableId)
      );
      const column = columns[sourceIndex];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);

      copiedItems.splice(destination.index, 0, removed);
      Axios.post("http://192.168.76.76:3001/api/card/update", {
        taskColumnId: column.id,
        cardId: removed.id,
        position: destination.index
      }).then((response, err) => {
      })
      setColumns((prevState) => {
        prevState[sourceIndex].items = copiedItems
        return [...prevState];
      })
    }
  }
  if (type === "Column") {
    if (!result.destination) return;
  }
};

const useStyles = makeStyles((theme) => ({
  appContainer: {
    display: "flex",
    flexDirection: "row",
    overflowX: "auto",
    whiteSpace: "no-wrap",
    overflowY: "hidden",
    position: "absolute",
    marginTop: "100px",
  },
  box2: {
    display: "block",
    padding: 10,
    width: 272,
  },
}));

function Body({ columns, setColumns, cardChange, setCardChange }) {
  const classes = useStyles();
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Droppable droppableId="all-tab" type="Column" direction="horizontal">
        {(provided) => (
          <Box
            className={classes.appContainer}
            component="div"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columns.map((column, index) => {
              return (
                <Column
                  cardChange={cardChange}
                  setCardChange={setCardChange}
                  column={column}
                  columnId={column.id}
                  index={index}
                  key={column.id}
                  setColumns={setColumns}
                />
              );
            })}
            {provided.placeholder}
            <Box className={classes.box2} component="div">
              <AddColumnForm columns={columns} setColumns={setColumns} setCardChange={setCardChange} />
            </Box>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Body;
