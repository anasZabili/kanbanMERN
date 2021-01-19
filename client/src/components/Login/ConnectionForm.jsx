import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Card,
  Box,
  TextField,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    alignItems: "center",
  },
}));

// TODO verifier que toute les information son rentré
// TODO verifier que les deux mots de passe son les même
const LoginForm = ({ handleOnClick }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  // TODO verifier le format
  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Typography variant="h4">Se connecter</Typography>
        <Grid item xs={12}>
          <TextField
            id="mail_accounte"
            label="Adresse mail"
            required
            fullWidth
            value={mail}
            onChange={handleMail}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password_accounte"
            label="Mot de passe"
            type="password"
            required
            fullWidth
            value={password}
            onChange={handlePassword}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => handleOnClick(mail, password)}
            size="medium"
            variant="contained"
            color="primary"
          >
            Se connecter
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
