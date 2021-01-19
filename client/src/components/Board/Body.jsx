import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import Column from "./Column";
import AddColumnForm from "./AddColumnForm";
import { Room } from "@material-ui/icons";

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
  if (!result.destination) return;
  const { source, destination, type } = result;
  if (type === "Card") {
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
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

function Body({ columns, setColumns }) {
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
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Column
                  column={column}
                  columnId={columnId}
                  index={index}
                  key={columnId}
                  setColumns={setColumns}
                />
              );
            })}
            {provided.placeholder}
            <Box className={classes.box2} component="div">
              <AddColumnForm columns={columns} setColumns={setColumns}/>
            </Box>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Body;
