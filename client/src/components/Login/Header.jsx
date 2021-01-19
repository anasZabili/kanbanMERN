import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

const Header = ({ setIsConnection }) => {
  const classes = useStyles();
  const handleConnection = () => {
    setIsConnection(true);
  };
  const handleCreateAcount = () => {
    setIsConnection(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trello
          </Typography>
          <Button color="inherit" onClick={handleConnection}>
            Se Connecter
          </Button>
          <Button color="inherit" onClick={handleCreateAcount}>
            Créer un compte
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
