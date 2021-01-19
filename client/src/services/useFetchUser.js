import { useEffect, useState } from "react";
import Axios from 'axios';

const useFetchUser = (login, password) => {

  // const [column, setColumn] = useState([]);
  // useEffect(() => {
    Axios.get('http://localhost:3001/api/user/get')
    .then((response, err) => {
      return response.data
      // console.log("wow", response.data)
      // setColumn(response.data)
    })
    // fetch data;
  // }, []);

  // return [...column]
};

export default useFetchUser;
