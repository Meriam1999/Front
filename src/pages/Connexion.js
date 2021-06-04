import React, { useState } from "react";
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  Snackbar,
  TextField
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { notification } from 'antd';
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import authService from "../service/authService";
import './style.css';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

import { useAuth } from '../Context/AuthContext';
// import { set } from "mongoose";



const MIN_USERNAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 5;
const images = [

  'assets/images/a-min.jpg',
  'assets/images/ba.jpg',
];


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",

  },
  submit: {
    margin: theme.spacing(0, 0, 0)
  }
}));
const openNotificationwarning = (placement, message) => {
  notification.warning({
    message,
    placement,
  });
};
const openNotificationerror = (placement, message) => {
  notification.error({
    message,
    placement,
  });
};

const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};

export default function SignInSide(props) {
  const classes = useStyles();

  // if(isauth true)
  // {

  //   <redicrect to="/:
  // }
  const [account, setAccount] = React.useState({ Email: "", Motdepasse1: "" });
  const [error, setError] = React.useState({ Email: "", Motdepasse1: "" });
  const [Email, setemail] = useState("");
  const [Motdepasse1, setMotdepasse1] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  const valideConnex = () => {
    if (Motdepasse1 && Email) {
      return true
    }
    return false
  }

  const handleConnexion = (event) => {
    event.preventDefault();
    const data = {
      Email: Email,
      Mot_de_passe: Motdepasse1
    }
    axios.post('http://localhost:4000/user/authentification', data)
      .then((res) => { console.log(res.data) })

  }
  const handleChange = (property, event) => {
    const accountCopy = {
      ...account
    };

    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
    validate(property);
  };

  const validate = (property) => {
    property === "Email" ? validateEmail() : validateMotdepasse1()
  };


  const validateEmail = () => {
    //     const errorCopy = { ...error };
    //   if(!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(account.Email)){
    //      errorCopy.Email = `Veuillez saisir un Email Correcte !`;
    //   } 
    //    else {
    //     errorCopy.Email= "";
    //   }
    //   setError(errorCopy);
  };

  const validateMotdepasse1 = () => {
    //   const errorCopy = { ...error };
    //   if (account.Motdepasse1.length < MIN_PASSWORD_LENGTH) {
    //     errorCopy.Motdepasse1 = `Le mot de passe doit être supérieur a ${MIN_PASSWORD_LENGTH} caractères`;
    //   } else {
    //     errorCopy.Motdepasse1 = "";
    //   }
    //   setError(errorCopy);
  };

  {/*Grid boostrap: 
      une ligne est composer des 12 colonnes
    faire pour les exran de taille xs 
      pour les ecrans de taille sm, prendre 4 colonnes parmi 12 et afficher l'image gallery
      et pour les ecran de taille medium kima l'ecran emte3eke prend 7 colonne pour afficher les images */}
  return (
    <Grid container component="main" className="containerr">
      <CssBaseline />
      <Grid item xs={false} sm={5} md={7}>
        <Slide easing="ease">
          <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${images[0]})` }}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ 'backgroundImage': `url(${images[1]})` }}>
            </div>
          </div>

        </Slide>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4} square>
        <div className={classes.paper}>
          <div className="Logo"><img style={{ width: "120px", height: "120px" }} src="../logo.png" /> </div>
          <Typography component="h1" variant="h5" style={{ marginTop: "-20px" }}>
            Connexion
              </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={Email}
              onChange={(event) => { setemail(event.target.value); handleChange("Email", event); }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={error.Email}
              helperText={error.Email}
              id="Email"
              label="Email"
              name="Email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Motdepasse1"
              label="Mot de passe"
              type="password"
              id="Motdepasse1"
              value={Motdepasse1}
              onChange={(event) => { setMotdepasse1(event.target.value); handleChange("Motdepasse1", event) }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleConnexion}
            >
              Connexion
                </Button>
            <Grid container>
              <Grid item style={{ marginLeft: "-45px" }}>
                <Link to="/inscription">{"Vous n'avez pas un Compte? Inscrivez-vous!"}</Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ marginLeft: "13px" }}>
                <Link to="/">{"Retour  à la page d'accueil"}</Link>
              </Grid>
            </Grid>

          </form>
        </div>
      </Grid>
    </Grid >
  );
}