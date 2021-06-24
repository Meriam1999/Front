import React, { useState, useContext } from "react";
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField
} from "@material-ui/core";
import Footer from '../components/Footer/Footer';
import GoogleLogin from 'react-google-login';
import Sidebar from '../components/NavBar/SideBar2';
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
import { AuthContext } from '../Context/AuthContext';
import './style.css';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

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
  const authContext = useContext(AuthContext);
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
    if (valideConnex()) {
      axios.post(`http://localhost:4000/user/authentification`, data)
        .then((res) => {
          console.log(res.data)
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('nom', res.data.nom);
          localStorage.setItem('role', res.data.role);
          const id = res.data.userId;
          const token = res.data.token;
          const nom = res.data.nom;
          const role = res.data.role;
          authContext.setAuth({ id, token, nom, role })
          openNotificationsucces('bottomRight', 'Bienvenue ');
          if (role == "Expert") {
            setTimeout(() => {
              history.push('/expert/Accueil')
            }, 2000)
          } else if (role == "Administrateur") {
            setTimeout(() => {
              history.push('/admin/Accueil')
            }, 2000)
          }
          else if (role == "Utilisateur") {
            setTimeout(() => {
              history.push('/')
            }, 2000)
          }
        }).catch((error) => {
          openNotificationerror('bottomRight', 'Veuillez verifier les données entrées!')
          console.log(error.response);
        });

    } else {
      openNotificationwarning('bottomRight', 'Veuillez Remplir les deux champs svp!');
    }
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

  const googleSuccess = async (res) => {
    console.log(res)
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log("google sign in was unsuccefful")
  }
  return (
    <>
      <Sidebar />
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
              <br />

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
            <GoogleLogin
              cliendId="363683454329-2eda3nvnadm0vgpl2p98i9h1e73i0mj4.apps.googleusercontent.com"
              render={renderProps => (
                <Button className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  // disabled={renderProps.disabled}
                  startIcon={<svg style={{ width: '20px', height: '20px' }}
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                    />
                  </svg>}
                  variant="contained"
                >
                  connexion avec Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
          </div>
        </Grid>
      </Grid >
      <Footer />
    </>
  );
}