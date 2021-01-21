import { useState, useContext } from "react";
import Body from "./Body";
import Header from "./Header";
import { AuthContext } from "../../App";
import Cookies from "js-cookie";
import Axios from "axios";
import useInsertUser from "../../services/useInsertUser";


const Login = () => {
  const [isConnection, setIsConnection] = useState(true);
  const [loginStatus, setLoginStatus] = useState("");
  const auth = useContext(AuthContext);
  let twoHourExpiration = new Date(new Date().getTime() + 120 * 60 * 1000);

  const handleOnClickConnection = async (login, password) => {
    Axios.post("http://localhost:3001/api/user/get", {
      mail: login,
      password: password,
    }).then((response, err) => {
      if (err) {
        console.log(err);
        return;
      }
      // alert("Nom de compte ou mot de passe incorrect")
      if (response.data.message) {
        alert(response.data.message);
      } else {
        Cookies.set(
          "user",
          response?.data[0]?.ID + "_" + response?.data[0]?.NAME,
          {
            expires: twoHourExpiration,
          }
        );
        auth.setAuth(true);
      }

      // setColumn(response.data)
    });
    // if le login et la mot de passe son dans la base alors je fait ça:
    // mettre le username a la place de user
    /*
    Axios.post("/api/user/login", {
      email: login,
      password: password,
    }).then((result) => {
      // a changer par la conditions d'erreur
      if (true) {
        Cookies.set("user", "loginTrue", {
          expires: twoHourExpiration,
        });
        auth.setAuth(true);
      }
    });
    */
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
    // useInsertUser(username, login, password1);
    // if le login et la mot de passe son dans la base alors je fait ça:
    // mettre le username a la place de user
    Axios.post("http://localhost:3001/api/user/insert", {
      username: name,
      mail: login,
      password: password1,
    }).then((result, err) => {
      if (err) {
        alert("erreur de créattion");
      }
    });

    // Axios.post("/api/user/login", {
    //   email: login,
    //   name: name,
    //   password1: password1,
    //   password2: password2,
    // }).then((result) => {

    // a changer par la conditions d'erreur

    Cookies.set("user", "loginTrue", {
      expires: twoHourExpiration,
    });
    auth.setAuth(true);

    //   alert("successfully insert");
    // });
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
