import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { AuthContext } from "../../App";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import InviteDialog from "./InviteDialog";

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

const Header = ({ handleInvited }) => {
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trello
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Inviter un Membre
          </Button>
          <Button color="inherit" onClick={handleBoard}>
            Tableau
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Déconnection
          </Button>
        </Toolbar>
      </AppBar>
      <InviteDialog
        open={open}
        handleClose={handleClose}
        handleClick={handleInvited}
      />
    </Box>
  );
};

export default Header;
