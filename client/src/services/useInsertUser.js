import { useEffect, useState } from "react";
import Axios from "axios";

const useInserrtUser = (username, mail, password) => {
  // const [column, setColumn] = useState(null);
  useEffect(() => {
    Axios.post("http://192.168.76.76:3001/api/user/insert", {
      username: username,
      mail: mail,
      password: password,
    }).then((err) => {
      // console.log(err);
    });
  }, [username, mail, password]);

  // return column;
};

export default useInserrtUser;
