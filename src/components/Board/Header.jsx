import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../App";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 15,
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const history = useHistory();
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const handleLogout = () => {
    auth.setAuth(false);
    // TODO replace by userID
    Cookies.remove("user");
  };
  const handleBoard = () => {
    history.push("/SelectBoard");
  }; 
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trello
          </Typography>
          <Button color="inherit" onClick={handleBoard}>
            Tableau
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Déconnection
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
