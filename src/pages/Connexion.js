import React,{useState} from "react";
import {
Avatar,
Button,
CssBaseline,
Snackbar,
TextField
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import {notification} from 'antd';
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import users from "../Data/Data";   
import authService from "../service/authService";
import './style.css';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';



const MIN_USERNAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 5;
const images = [
  
     'assets/images/a-min.jpg',
    'assets/images/ba.jpg',
];


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(16, 4),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(0, 0, 0)
  }
}));

 const openNotification = (placement,message) => {
    notification.info({
      message,
      placement,
    });
  };
export default function SignInSide(props) {
  if (authService.isLoggedIn()) {
    props.history.push("/");
  }
  

  const classes = useStyles();


  const [account, setAccount] = React.useState({ Identifiant:"",Motdepasse1: "" });
  const [error, setError] = React.useState({ Identifiant:"",Motdepasse1: "" });
  const [open, setOpen] = React.useState(false);

  
  const handleChange = (property, event) => {
    const accountCopy = {
      ...account
    };

    accountCopy[property] = event.target.value;
    setAccount(accountCopy);

    validate(property);
  };

  const validate = (property) => {
    property === "Identifiant" ? validateIdentifiant(): validateMotdepasse1()
  };
// const valideConnex =()=>{
//     if(Identifiant && Motdepasse1 ){
//       return  true
//     }else{
//     return false}
//   }


  const handleLogin = () => {
    if (isValidUser(account.Identifiant, account.Motdepasse1)){
      openNotification('bottomRight','mriguel ');
      authService.doLogin(account.Identifiant);
      props.history.push("/");
    } else {
      openNotification('bottomRight','non');
    }
  };

  const isValidUser = (Identifiant,Motdepasse1) => {
    return users.find(
      (user) => user.Identifiant === Identifiant && user.Motdepasse1 === Motdepasse1
    );
  };

  const validateIdentifiant = () => {
    const errorCopy = { ...error };
    if (account.Identifiant.includes(" ")) {
      errorCopy.Identifiant = "le Nom d'utilisateur ne peut pas contenir des espaces";
    } else if (account.Identifiant.length < MIN_USERNAME_LENGTH) {
      errorCopy.Identifiant = `Le Nom d'utilisateur doit être supérieur a ${MIN_USERNAME_LENGTH} caractères `;
    } else {
      errorCopy.Identifiant = "";
    }

    setError(errorCopy);
  };

  const validateMotdepasse1 = () => {
    const errorCopy = { ...error };
    if (account.Motdepasse1.length < MIN_PASSWORD_LENGTH) {
      errorCopy.Motdepasse1 = `Le mot de passe doit être supérieur a ${MIN_PASSWORD_LENGTH} caractères`;
    } else {
      errorCopy.Motdepasse1 = "";
    }
    setError(errorCopy);
  };
   {/*Grid boostrap: 
      une ligne est composer des 12 colonnes
    faire pour les exran de taille xs 
      pour les ecrans de taille sm, prendre 4 colonnes parmi 12 et afficher l'image gallery
      et pour les ecran de taille medium kima l'ecran emte3eke prend 7 colonne pour afficher les images */}
      return (
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={5} md={7}>
              <Slide easing="ease">
                <div className="each-slide">
                  <div style={{'backgroundImage': `url(${images[0]})`}}>
                  </div>
                </div>
                <div className="each-slide">
                  <div style={{'backgroundImage': `url(${images[1]})`}}>
                  </div>
                </div>
               
              </Slide>
            </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={4} square>
            <div className={classes.paper}>
              <img style={{width:"120px",height:"120px",marginTop:"-130px",paddingBottom:"-24px"}} src="../logo.png" />
              <Typography component="h1" variant="h5">
                Connexion
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  value={account.Identifiant}
                  onChange={(event) => handleChange("Identifiant", event) } 
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={error.Identifiant}
                  helperText={error.Identifiant}
                  id="Identifiant"
                  label="Identifiant"
                  name="Identifiant"
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
                  value={account.Motdepasse1}
                  onChange={(event) => handleChange("Motdepasse1", event)}
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
                  onClick={handleLogin}
                >
                  Connexion
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/inscription">{"Vous n'avez pas un Compte? Inscrivez-vous!"}</Link>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item style={{marginLeft:"60px"}}>
                    <Link to="/">{"Retour  à la page d'accueil"}</Link>
                  </Grid>
                </Grid>
              
              </form>
            </div>
          </Grid>
        </Grid>
      );
    }