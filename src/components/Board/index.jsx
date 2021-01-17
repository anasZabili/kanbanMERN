import Body from "./Body";
import Header from "./Header";
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid";

const Home = () => {
  const itemsFromBackend = [
    { id: uuid(), content: "First task", index: 4 },
    { id: uuid(), content: "Second task", index: 3 },
    { id: uuid(), content: "Third task", index: 2 },
    { id: uuid(), content: "Fourth task", index: 1 },
    { id: uuid(), content: "Fifth task", index: 0 },
  ];
  
  const columnsFromBackend = {
    [uuid()]: {
      name: "Requested",
      items: itemsFromBackend,
    },
    [uuid()]: {
      name: "To do",
      items: [],
    },
    [uuid()]: {
      name: "In Progress",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      items: [],
    },
  };
  // Object.entries(columnsFromBackend).map(([columnId, column], index) =>
  //   column.items?.sort((a, b) => a.index - b.index)
  // );  // repenser la disposition des colum faire un tableau d'id de column et agire en consequence ...
  const tabsFromBackend = { id: uuid(), columns: columnsFromBackend };
  const [columns, setColumns] = useState(columnsFromBackend);
  console.log("🚀 ~ file: index.jsx ~ line 38 ~ Home ~ columns", columns)
  const handleCardDragEnd = () => {
    
  }
  // useEffect(() => {
  //   Object.entries(columns).map(([columnId, column], index) =>
  //     column.items?.sort((a, b) => a.index - b.index)
  //   );
  // });

  return (
    <>
      <Header />
      <Body columnsFromBackend={columnsFromBackend} columns={columns} setColumns={setColumns}/>
    </>
  );
};

export default Home;
