import { useState, createContext, useEffect } from "react";
import SelectBoard from "./components/SelectBoard";
import Board from "./components/Board";
import Login from "./components/Login";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedLogin from "./ProtectedLogin";
import Cookies from "js-cookie";
import useFetchUser from './services/useFetchUser'

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(false);
  // const data = useFetchUser();
  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setAuth(true);
    }
  }  
  useEffect(() => {
    readCookie(); 
  }, [])
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter basename={"/FrontZabili"}>
        <Switch>
          <ProtectedLogin auth={auth} path="/" exact component={Login} />
          <ProtectedRoutes auth={auth} path="/Home/:boardId" component={Board} />
          <ProtectedRoutes auth={auth} path="/SelectBoard" component={SelectBoard} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
