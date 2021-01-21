import Body from "./Body";
import Header from "./Header";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Home = () => {
  // const itemsFromBackend = [
  //   { id: uuid(), content: "First task", index: 4 },
  //   { id: uuid(), content: "Second task", index: 3 },
  //   { id: uuid(), content: "Third task", index: 2 },
  //   { id: uuid(), content: "Fourth task", index: 1 },
  //   { id: uuid(), content: "Fifth task", index: 0 },
  // ];

  // const columnsFromBackend = {
  //   [uuid()]: {
  //     name: "Requested",
  //     items: itemsFromBackend,
  //   },
  //   [uuid()]: {
  //     name: "To do",
  //     items: [],
  //   },
  //   [uuid()]: {
  //     name: "In Progress",
  //     items: [],
  //   },
  //   [uuid()]: {
  //     name: "Done",
  //     items: [],
  //   },
  // };
  // Object.entries(columnsFromBackend).map(([columnId, column], index) =>
  //   column.items?.sort((a, b) => a.index - b.index)
  // );  // repenser la disposition des colum faire un tableau d'id de column et agire en consequence ...
  // const tabsFromBackend = { id: uuid(), columns: columnsFromBackend };
  const [columns, setColumns] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [cardChange, setCardChange] = useState(0);
  const { boardId } = useParams();
  useEffect(() => {
    Axios.post("http://localhost:3001/api/taskColumn/get", {
      boardId: boardId,
    })
      .then((response, err) => {
        const newData = response.data.map((value) => {
          return { ...value, items: [] };
        });
        setColumns(newData);
        return response;
      })
      .then((response) => {
        let promises = [];
        for (let i = 0; i < response.data.length; i++) {
          promises.push(
            Axios.post("http://localhost:3001/api/card/get", {
              taskColumnId: response.data[i].id,
            }).then((response) => {
              setColumns((prevState) => {
                prevState[i].items = response.data;
                return [...prevState];
              });
            })
          );
        }
        Promise.all(promises)
          .then((result) => {
            setReveal(true);
          })
          .then(
            setColumns((prevState) => {
              for (let i = 0; i < prevState?.length; i++) {
                prevState.items?.sort((a, b) => a.positon - b.postion);
              }
              prevState?.sort((a, b) => a.positon - b.postion);
              return [...prevState];
            })
          );
      });
  }, [boardId, cardChange]);

  // const handleCardDragEnd = () => {};
  // useEffect(() => {
  //   Object.entries(columns).map(([columnId, column], index) =>
  //     column.items?.sort((a, b) => a.index - b.index)
  //   );
  // });

  return (
    <>
      <Header />
      {reveal ? (
        <Body
          cardChange={cardChange}
          setCardChange={setCardChange}
          columns={columns}
          setColumns={setColumns}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Home;
