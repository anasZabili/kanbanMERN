import { useState } from "react";
import {
  Grid,
  TextField,
  Container,
  Typography,
  Button,
} from "@material-ui/core";


const LoginForm = ({ handleOnClick }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
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
