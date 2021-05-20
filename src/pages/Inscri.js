import React,{useState} from "react";

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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {notification} from 'antd';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import users from "../Data/Data";   

import authService from "../service/authService.js";


const MIN_USERNAME_LENGTH = 2;
 const MIN_PASSWORD_LENGTH = 3;

 const openNotification = (placement,message) => {
    notification.info({
      message,
      placement,
    });
  };

const currencies = [
  {
    value: 'Homme'
  },
  {
    value: 'Femme',
    
  },
];


// const handleChange = (event) => {
//   setCurrency(event.target.value);
// };

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
 const [account, setAccount] = React.useState({ Nom:"",Identifiant:"",Prenom:"",Motdepasse1:"",Motdepasse2:"",Email:"",Numero:"" });
 const [error, setError] = React.useState({ Identifiant:"",Prenom:"" ,Nom:"",Motdepasse1:"",Motdepasse2:"",Email:"",Numero:"" });
 const [open, setOpen] = React.useState(false);
const [Nom,setNom] = useState("");
const [Prenom,setPrenom] = useState("");
const [Identifiant,setidentifiant] = useState("");
const [Sexe,setSexe] = useState("");
const [dateNaissance,setDateNaissance] = useState("");
const [Numero,setNumero] = useState("");
const [Email,setemail] = useState("");
const [Motdepasse1,setMotdepasse1] = useState("");
const [Motdepasse2,setMotdepasse2] = useState("");
 const valideinscri =()=>{
    if(Nom && Prenom && Identifiant &&Numero && Motdepasse1 && Motdepasse2 && Email &&dateNaissance &&Sexe ){
      return  true
    }
    return false
  }
  const [open1, setOpen1] = React.useState(false);

  const handleChange1 = (event) => {
    setSexe(event.target.value);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleinscrit = (event) => {
    event.preventDefault();
    if(valideinscri()) {
     openNotification('bottomRight','ok');
    }else{
      openNotification('bottomRight','Merci de Remplir Tous les Champs obligatoires!');
    }
  }
  /*************************************** */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") { 
      return;
    }
    setOpen(false);
  };

  const handleChange = (props, event) => {
    const accountCopy = {
      ...account
    };
    accountCopy[props] = event.target.value;
    setAccount(accountCopy);
    validate(props);
  };
 
 

  
  //nekteb heja fil page mch home 
  const handleLogin = () => {
    if (isValidUser(account.Identifiant, account.Prenom,account.Nom,account.Motdepasse1,account.Motdepasse2,account.Numero)) {
      authService.doLogin(account.Identifiant);
      props.history.push("/");// login   
     } else {
      setOpen(true);
    }
  };
  const validate = (props) => {
    if (props === "Identifiant" ){
       validateidentitifant()}
      else if (props === "Prenom"){
        validateprenom()
      } 
      else if (props==="Nom"){
        validatenom()
      }else if (props==="Motdepasse1")
      {
        validateMotdepasse1()
      }
      else if(props==="Motdepasse2")
      {
        validateMotdepasse2()
      }
      else if(props==="Email")
      {
        validateEmail()
      }else if(props==="Numero")
      {
        validateNumero()
      }
  };

  const isValidUser = ( Identifiant, Prenom,Nom,Motdepasse1,Motdepasse2,Email,Numero) => {
    return users.find(
      (user) => user.Identifiant === Identifiant && user.Prenom === Prenom && user.Nom===Nom&& user.Motdepasse1===Motdepasse1 && user.Motdepasse2===Motdepasse2&& user.Email===Email&& user.Numero===Numero
    );
  };
/***********Controle de saisies des champs :  *************/
  const validatenom = () => {
    const errorCopy = { ...error };
     if(! /^[a-zA-Z]*$/g.test(account.Nom)) {
        errorCopy.Nom = "Veuillez insèrer que des lettres SVP !";  
    }
    else if (account.Nom.length < MIN_USERNAME_LENGTH) {
                   errorCopy.Nom = `Le Nom d'utilisateur doit être supérieur à ${MIN_USERNAME_LENGTH} caractéres `;
          } 
          else if (account.Nom.length > 15) {
                   errorCopy.Nom= `Le Nom d'utilisateur ne peut pas depasser 15 caractéres !`;
          } 
          else {
               errorCopy.Nom= "";
          }
    setError(errorCopy);
  };

   const validateprenom = () => {
    const errorCopy = { ...error };

      if(! /^[a-zA-Z]*$/g.test(account.Prenom)) {
        errorCopy.Prenom = "Veuillez insèrer que des lettres SVP !"; 
    }
    else if (account.Prenom.length < MIN_USERNAME_LENGTH) {
                   errorCopy.Prenom = `Le Prenom d'utilisateur doit être supérieur à ${MIN_USERNAME_LENGTH} caractéres `;
                    
          } 
          else if (account.Prenom.length > 15) {
                   errorCopy.Prenom= `Le Prenom d'utilisateur ne peut pas depasser 15 caractéres !`;
                   
          } 
          else {
               errorCopy.Prenom= "";
              
          }
    setError(errorCopy);
  };

   const validateidentitifant = () => {
     const errorCopy = { ...error };

      if (account.Identifiant.length < MIN_USERNAME_LENGTH) {
                   errorCopy.Identifiant = `L'identifiant  doit être supérieur à ${MIN_USERNAME_LENGTH} caractéres `;
                    
          } 
          else if (account.Identifiant.length > 15) {
                   errorCopy.Identifiant= `L'identifiant ne peut pas depasser 15 caractéres !`;
                   
          } 
          else {
               errorCopy.Identifiant= "";
          }
    setError(errorCopy);
  };

  const validateMotdepasse1 = () => {
    const errorCopy = { ...error };
    if (account.Motdepasse1.length < 5) {
      errorCopy.Motdepasse1 = `Le mot de passe doit être supérieur 5 caracteres`;
    } else {
      errorCopy.Motdepasse1= "";
    }
    setError(errorCopy);
  };

  const validateMotdepasse2 = () => {
    const errorCopy = { ...error };
    if ( (account.Motdepasse2 !== account.Motdepasse1) && (account.Motdepasse2.includes(account.Motdepasse1))) {
      errorCopy.Motdepasse2 = 'Les deux mots de passes ne se correspondent pas !';
    } else {
      errorCopy.Motdepasse2= "";
    }
    setError(errorCopy);
  };
  const validateNumero = () => {
    const errorCopy = { ...error };
    if( !/^[0-9\b]+$/g.test(account.Numero)) {
        errorCopy.Numero = "Veuillez insèrer que des Chiffres SVP !"; 
    }
    else if (account.Numero.length != 7) {
                   errorCopy.Numero = 'Le Numero de Téléphone doit etre composée de 8 chiffres !' ;
    }
   
          else {
               errorCopy.Numero= "";
          }
    setError(errorCopy);
  };

  const validateEmail= () => {
    const errorCopy = { ...error };
    if(!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(account.Email)){
       errorCopy.Email = `Veuillez saisir un Email Correcte !`;
    } 
    else if (account.Email.length < MIN_PASSWORD_LENGTH) {
      errorCopy.Email = `l'Email doit être supérieur a  ${MIN_PASSWORD_LENGTH} caracteres`;
    } else {
      errorCopy.Email= "";
    }
    setError(errorCopy);
  };

  return (
    <Container  style={{paddingBottom:"50px",marginTop:"-40px" , borderColor:"grey" }}component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
       <img style={{width:"120px",height:"120px",paddingRight:"5px",marginBottom:"-25px"}} src="../logo.png" />
        <Typography component="h1" variant="h5">
          Inscription
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Nom"
                variant="outlined"
                value={Nom}
                onChange={(event)=>{
        setNom(event.target.value) ;handleChange("Nom", event);}}  
               error={error.Nom}
                helperText={error.Nom}
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
                value={Prenom}
                onChange={(event)=>{
        setPrenom(event.target.value) ; handleChange("Prenom", event);}} 
                error={error.Prenom}
                helperText={error.Prenom}
                id="Prenom"
                label="Prenom"
                name="Prenom"
                autoComplete="Prenom"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              required
                variant="outlined"
                 value={Identifiant}
                onChange={(event)=>{
        setidentifiant(event.target.value); handleChange("Identifiant", event);}}  
                fullWidth
                error={error.Identifiant}
                helperText={error.Identifiant}
                id="identifiant"
                label="Identifiant"
                name="Identifiant"
                autoComplete="off"
              />
            </Grid>
           
            <Grid item xs={12} sm={6}>
            <TextField
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
             value={Numero}
                onChange={(event)=>{
        setNumero(event.target.value);handleChange("Numero", event);}}  
              error={error.Numero}
                helperText={error.Numero}
                fullWidth
                id="Numero"
                label="Numero de telephone "
                name="Numero"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
      
           
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open1}
          required
          onClose={handleClose1}
          onOpen={handleOpen1}
          value={Sexe}
          onChange={setSexe}
          onChange= {handleChange1}
        >
          <MenuItem value="Femme">
            <em> Femme </em>
          </MenuItem>
          <MenuItem value="Homme">Homme</MenuItem>        
        </Select>
           
    
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                 value={Email}
                onChange={(event)=>{
        setemail(event.target.value);handleChange("Email", event);}}  
                fullWidth
                error={error.Email}
                helperText={error.Email}
                id="Email"
                label="Adresse E-mail"
                name="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Motdepasse1"
                label="mot de passe"
                
                 value={Motdepasse1}
                onChange={(event)=>{
        setMotdepasse1(event.target.value); handleChange("Motdepasse1", event);}}  
                error={error.Motdepasse1}
                helperText={error.Motdepasse1}
                id="Motdepasse1"
                autoComplete="mot de passe"
              
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
               
               value={Motdepasse2}
                onChange={(event)=>{
        setMotdepasse2(event.target.value); handleChange("Motdepasse2", event);}}  
                fullWidth
                error={error.Motdepasse2}
                helperText={error.Motdepasse2}
                name="Motdepasse2"
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