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
    console.log(
      "🚀 ~ file: index.jsx ~ line 14 ~ handleOnClickConnection ~ password",
      password
    );
    console.log(
      "🚀 ~ file: index.jsx ~ line 14 ~ handleOnClickConnection ~ login",
      login
    );

    // if le login et la mot de passe son dans la base alors je fait ça:
    // mettre le username a la place de user
    /*
    Axios.post("/api/user/login", {
      email: login,
      password: password,
    }).then((result) => {
      console.log("🚀 ~ file: index.jsx ~ line 22 ~ .then ~ result", result);
      // a changer par la conditions d'erreur
      if (true) {
        Cookies.set("user", "loginTrue", {
          expires: twoHourExpiration,
        });
        console.log("coucou les amis");
        auth.setAuth(true);
      }
    });
    */
    Cookies.set("user", "loginTrue", {
      expires: twoHourExpiration,
    });
    console.log("coucou les amis");
    auth.setAuth(true);
  };
  const handleOnClickCreation = async (login, password1, password2, name) => {
    if (password1 !== password2) {
      alert("Mot de passe pas identique");
    }
    // if le login et la mot de passe son dans la base alors je fait ça:
    // mettre le username a la place de user

    Axios.post("/api/user/login", {
      email: login,
      name: name,
      password1: password1,
      password2: password2,
    }).then((result) => {
      console.log(
        "🚀 ~ file: index.jsx ~ line 40 ~ handleOnClickCreattion ~ result",
        result
      );
      // a changer par la conditions d'erreur
      if (true) {
        Cookies.set("user", "loginTrue", {
          expires: twoHourExpiration,
        });
        console.log("coucou les amis");
        auth.setAuth(true);
      }
      alert("successfully insert");
    });
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
