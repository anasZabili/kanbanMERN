import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import Column from "./Column";
import AddColumnForm from "./AddColumnForm";
import { Room } from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import Axios from "axios";

// const onDragEnd = (result, columns, setColumns) => {
//   if (!result.destination) return;
//   const { source, destination, type } = result;
//   console.log(
//     "🚀 ~ file: Body.jsx ~ line 12 ~ onDragEnd ~ destination",
//     destination
//   );
//   console.log("🚀 ~ file: Body.jsx ~ line 12 ~ onDragEnd ~ source", source);
//   if (type === "Card") {
//     if (source.droppableId !== destination.droppableId) {
//       const sourceColumn = columns[source.droppableId];
//       const destColumn = columns[destination.droppableId];
//       const sourceItems = [...sourceColumn.items];
//       const destItems = [...destColumn.items];
//       const [removed] = sourceItems.splice(source.index, 1);
//       destItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...sourceColumn,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destColumn,
//           items: destItems,
//         },
//       });
//     } else {
//       const column = columns[source.droppableId];
//       const copiedItems = [...column.items];
//       const sindex = source.index;
//       console.log(
//         "element source",
//         copiedItems.find((value) => value.index === source.index)
//       );
//       copiedItems.find((value) => value.index === source.index).index =
//         destination.index;
//       copiedItems.find(
//         (value) => value.index === destination.index
//       ).index = sindex;
//       console.log(
//         "🚀 ~ file: Body.jsx ~ line 39 ~ onDragEnd ~ copiedItems",
//         copiedItems
//       );
//       // const [removed] = copiedItems.splice(source.index, 1);

//       // console.log("🚀 ~ file: Body.jsx ~ line 34 ~ onDragEnd ~ removed", removed)
//       // removed.index = destination.index
//       // copiedItems.splice(destination.index, 0, removed);
//       setColumns({
//         ...columns,
//         [source.droppableId]: {
//           ...column,
//           items: copiedItems,
//         },
//       });
//     }
//   }
//   if (type === "Column") {
//     if (!result.destination) return;
//   }
// };
const onDragEnd = (result, columns, setColumns) => {
  console.log("🚀 ~ file: Body.jsx ~ line 72 ~ onDragEnd ~ columns", columns);
  if (!result.destination) return;
  const { source, destination, type } = result;
  console.log(
    "🚀 ~ file: Body.jsx ~ line 74 ~ onDragEnd ~ destination",
    destination
  );
  console.log("🚀 ~ file: Body.jsx ~ line 74 ~ onDragEnd ~ source", source);
  if (type === "Card") {
    if (source.droppableId !== destination.droppableId) {
      // console.log("le forçage donne", parseInt(source.droppableId));
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
      Axios.post("http://localhost:3001/api/card/update", {
        taskColumnId: destColumn.id,
        cardId: removed.id,
        position: destination.index
      }).then((response, err) => {
        console.log("update fait", response);
      })
      // Axios.post("http://localhost:3001/api/card/insert", {
      //   taskColumnId: destColumn.id,
      //   personInChargeId: removed.personInChargeId,
      //   content: removed.content,
      //   // todo bien set la position
      //   position: 20,
      // }).then(
       
      // );
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
      const destIndex = columns.findIndex(
        (value) => value.id === parseInt(destination.droppableId)
      );
      const column = columns[sourceIndex];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      
      copiedItems.splice(destination.index, 0, removed);
      Axios.post("http://localhost:3001/api/card/update", {
        taskColumnId: column.id,
        cardId: removed.id,
        position: destination.index
      }).then((response, err) => {
        console.log("update fait", response);
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
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0
    // display: 'inlineBlock',
    // display: 'flex',
    // flexWrap: 'no-wrap',
    // whiteSpace: 'no-wrap',
    // display: 'block'
  },
  box2: {
    // float: 'left',
    display: "block",
    padding: 10,
    // display: '' ,
    width: 272,
  },
}));

function Body({ columns, setColumns, cardChange, setCardChange }) {
  console.log("🚀 ~ file: Body.jsx ~ line 149 ~ Body ~ columns", columns);
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
              <AddColumnForm columns={columns} setColumns={setColumns} />
            </Box>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Body;
