import React, { useState, useEffect } from "react";
import axios from 'axios';
import './style.css'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { notification } from 'antd';


const openNotificationsucces = (placement, message) => {
  notification.success({
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
const openNotificationwarning = (placement, message) => {
  notification.warning({
    message,
    placement,
  });
};


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));



export default function SignUp(props) {

  const classes = useStyles();


  /**************************************** */

  const [Sexe, setSexe] = useState("");
  // const [dateNaissance,setDateNaissance] = useState("");
  const [numero_telephone, setnumero_telephone] = useState("");
  const [Email, setemail] = useState("");
  const [Motdepasse1, setMotdepasse1] = useState("");
  const [Motdepasse2, setMotdepasse2] = useState("");


  const initialData = { nom: "", prenom: "", email: "", numero_telephone: "", motPasse: "", motPasseConfirme: "", identifiant: "", Sexe: "" }
  const [data, setData] = useState({ ...initialData })
  const [dataErrors, setDataErrors] = useState({})

  const valideinscri = () => {
    if (Sexe && data.nom !== "" && data.prenom !== "" && data.email !== "" && data.numero_telephone !== "" && data.motPasse !== "" && data.motPasseConfirme !== "" && data.identifiant !== "" && dataErrors.numero_telephoneError === "" && dataErrors.nomError === "" && dataErrors.emailError === "" && dataErrors.prenomError === "" && dataErrors.motPasseConfirmeError === "") {
      console.log("ok");
      return true
    } else {
      console.log("non")
      return false
    }
  }
  const [open1, setOpen1] = React.useState(false);
  const resetData = () => {
    setData("");
    setSexe("");
    return true
  };
  const history = useHistory();


  const handleChange1 = (event) => {
    setSexe(event.target.value)
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleinscrit = (event) => {
    event.preventDefault();
    const NvUtilisateur = {
      Nom: data.nom,
      Prenom: data.prenom,
      Nom_utilisateur: data.identifiant,
      Mot_de_passe: data.motPasse,
      Photo_profile: "photo",
      Genre: Sexe,
      Email: data.email,
      Numero_telephone: data.numero_telephone,
    };

    if (valideinscri()) {
      axios.post('/user/ajouter', NvUtilisateur)
        .then((res) => {
          openNotificationsucces('bottomRight', 'inscription effectuée avec succès , Veuillez vous Connectez ');
          console.log("ajout utilisateur avec succes ")
          console.log(res)

        }).catch((error) => {
          console.log(error.response);
        });
      history.push("/connexion");
    } else {
      openNotificationwarning('bottomRight', 'Veuillez Remplir tous les Champs avec des informations valides SVP!');
    }
  }
  /*************************************** */


  const validInputData = (name, value) => {
    const regExp = [/^[a-zA-Z]+$/,
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      /^[0-9\b]+$/g,

    ]
    const testFunctions = {
      'prenom': () => {
        if (!regExp[0].test(value.replace(' ', ''))) {
          return "Le prénom ne doit contenir que des lettres !"
        }
        else if (value.length < 3) {
          return "Le prénom doit contenir au moins 3 lettres !"
        } else {
          return ""
        }
      },
      'nom': () => {
        if (!regExp[0].test(value.replace(' ', ''))) {
          return "Le nom ne doit contenir que des lettres"
        }
        else if (3 > value.length) {
          return "Le nom doit contenir au moins 3 letters !!"
        } else {
          return ""
        }
      },
      'email': () => {
        if (!regExp[1].test(value)) {
          return "L'email est Invalide !"
        }
        else {
          return ""
        }
      },
      'numero_telephone': () => {
        if (!regExp[2].test(value)) {
          return "Le Numéro de téléphone est Invalide !"
        } else if (value.length !== 8) {
          return "le Numéro de téléphone doit etre composé que de 8 chiffres "
        }
        else {
          return ""
        }
      },
      'identifiant': () => { return "" },
      'motPasse': () => {
        if (5 > value.length) {
          return "Le mot de passe doit contenir au moins 6 caractéres"
        }

      },
      'motPasseConfirme': () => {
        return value !== data.motPasse ? "Les deux mots de passe ne sont pas Identiques !" : ""
      },
      'identifiant': () => {
        if (3 > value.length) {
          return "Le Nom d'Utilisateur doit contenir au moins 4 caractéres"
        }
      }
    }

    if (value) {
      return (testFunctions[name]())
    }
    return "Ce champ est obligatoire !"
  }

  const handleChange = (event) => {
    const newData = { ...data };
    const { value, name } = event.target;
    newData[name] = value;
    setData(newData);
    const newDataErros = { ...dataErrors };
    newDataErros[`${name}Error`] = validInputData(name, value);
    if (name === 'motPasse') {
      newDataErros.motPasseConfirmeError = value === data.motPasseConfirme ? "" : "Les deux mots de passe ne sont pas Identiques !"
    }
    if (name === 'Sexe') {

    }
    setDataErrors(newDataErros);
  };



  return (
    <Container style={{ paddingBottom: "50px", marginTop: "-40px", borderColor: "grey" }} component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{ width: "120px", height: "120px", paddingRight: "5px", marginBottom: "-25px" }} src="../logo.png" />
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nom"
                variant="outlined"
                value={data.nom}
                onChange={handleChange}
                error={dataErrors.nomError ? true : false}
                helperText={dataErrors.nomError}
                id="Nom"
                fullWidth
                autoFocus
                label="Nom"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={data.prenom}
                onChange={handleChange}
                error={dataErrors.prenomError ? true : false}
                helperText={dataErrors.prenomError}
                id="Prenom"
                label="Prenom"
                name="prenom"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="outlined"
                onChange={handleChange}
                fullWidth
                value={data.identifiant}
                error={dataErrors.identifiant}
                helperText={dataErrors.identifiant}
                id="identifiant"
                label="Nom d'utilisateur"
                name="identifiant"
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}> */}
            {/* <TextField
                variant="outlined"
              onChange={(value)=>{
                  if(value){
                       const date = new Date(value["_d"]);
              setDateNaissance(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
                  }
               }}
                fullWidth
                id="dateNaissance"
                type="date"
                name="dateNaissance"
                
              />   
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Select

                id="demo-controlled-open-select"
                open={open1}
                required
                name="Sexe"
                onClose={handleClose1}
                onOpen={handleOpen1}
                value={Sexe}
                onChange={(e) => { setSexe(e.target.value); console.log(e.target.value) }}
              >
                <MenuItem value="Femme"> Femme </MenuItem>
                <MenuItem value="Homme">Homme</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                onChange={handleChange}
                value={data.numero_telephone}
                error={dataErrors.numero_telephoneError ? true : false}
                helperText={dataErrors.numero_telephoneError}
                fullWidth
                id="numero_telephone"
                label="numero de telephone "
                name="numero_telephone"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={data.email}
                error={dataErrors.emailError ? true : false}
                helperText={dataErrors.emailError}
                onChange={handleChange}
                fullWidth
                id="Email"
                label="Adresse E-mail"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                variant="outlined"
                label="mot de passe"
                name="motPasse"
                onChange={handleChange}
                value={data.motPasse}
                error={dataErrors.motPasseError ? true : false}
                helperText={dataErrors.motPasseError}
                id="Motdepasse1"

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="password"
                onChange={handleChange}
                fullWidth
                value={data.motPasseConfirme}
                error={dataErrors.motPasseConfirmeError ? true : false}
                helperText={dataErrors.motPasseConfirmeError}
                name="motPasseConfirme"
                label="Confirmer votre mot de passe"
                id="Motdepasse2"
                autoComplete="new-password"
              />
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleinscrit}
          >
            Confirmer
          </Button>
          <Button
            type="reset"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.reset}
            onClick={resetData}
          >
            Annuler
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/connexion">vous avez deja un Compte ? Connectez-vous!</Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}