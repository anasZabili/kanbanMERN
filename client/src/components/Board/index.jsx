import Body from "./Body";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { CircularProgress } from "@material-ui/core";

const Home = () => {
  const [columns, setColumns] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [cardChange, setCardChange] = useState(0);
  const { boardId } = useParams();

  const handleInvited = (mail) => {
    Axios.post("http://192.168.76.76:3001/api/invited/insert", {
      mail: mail,
      boardId: boardId
    }).then((response, err) => {
    });
  };

  useEffect(() => {
    Axios.post("http://192.168.76.76:3001/api/taskColumn/get", {
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
            Axios.post("http://192.168.76.76:3001/api/card/get", {
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

  return (
    <>
      <Header handleInvited={handleInvited} />
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
