import { useState, createContext, useEffect } from "react";
import SelectBoard from "./components/SelectBoard";
import Board from "./components/Board";
import Login from "./components/Login";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectedLogin from "./ProtectedLogin";
import Cookies from "js-cookie";

export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(false);
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
      <BrowserRouter>
        {/* penser a bien lui passer le user conecter quand cette partie sera faite */}
        {/* <SelectBoard/> */}
        {/* <Header />
      <Body /> */}
        <Switch>
          <ProtectedLogin auth={auth} path="/" exact component={Login} />
          <ProtectedRoutes auth={auth} path="/Home" component={Board} />
          <ProtectedRoutes auth={auth} path="/SelectBoard" component={SelectBoard} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
