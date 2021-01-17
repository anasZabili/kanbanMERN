import { Redirect, Route } from "react-router-dom";

const ProtectedRoutes = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/" />)}
    />
  );
};

export default ProtectedRoutes;
