import { useState, useContext } from "react";
import Body from "./Body";
import Header from "./Header";
import { AuthContext } from "../../App";
import Cookies from "js-cookie";
import Axios from "axios";

const Login = () => {
  const [isConnection, setIsConnection] = useState(true);
  const auth = useContext(AuthContext);
  let twoHourExpiration = new Date(new Date().getTime() + 120 * 60 * 1000);

  const handleOnClickConnection = async (login, password) => {
    Axios.post("http://192.168.76.76:3001/api/user/get", {
      mail: login,
      password: password,
    }).then((response, err) => {
      if (err) {
        console.log(err);
        return;
      }
      if (response.data.message) {
        alert(response.data.message);
      } else {
        Cookies.set(
          "user",
          response?.data[0]?.id + "_" + response?.data[0]?.name,
          {
            expires: twoHourExpiration,
          }
        );
        auth.setAuth(true);
      }

    });
  };
  const handleOnClickCreation = async (login, password1, password2, name) => {
    if (password1 !== password2) {
      alert("Mot de passe pas identique");
      return;
    }
    if (!login || !password1 || !password2 || !name) {
      alert("Veuillez renseigner toute les informations");
      return;
    }
    Axios.post("http://192.168.76.76:3001/api/user/insert", {
      username: name,
      mail: login,
      password: password1,
    }).then((result, err) => {
      alert("coucou");
      if (err) {
        alert("erreur de créattion");
      }
    });

    setIsConnection(true);
  };

  return (
    <>
      <Header setIsConnection={setIsConnection} />
      <Body
        isConnection={isConnection}
        handleOnClickConnection={handleOnClickConnection}
        handleOnClickCreation={handleOnClickCreation}
      />
    </>
  );
};

export default Login;
