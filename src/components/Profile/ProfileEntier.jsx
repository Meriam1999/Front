import React from "react";
import './styling.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile";
import PubCard from '../AnnonceItems/pubCards';
import AnnonceItem from '../AnnonceItems/AnnonceItem';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },


}));


export default function Login(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid  container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <div  className={classes.paper}>
            <Profile  />
          </div>
        </Grid>
        <Grid style={{display:"flex", flexDirection:"row", position:"relative" , margin:"50px 0 45px" ,justifyContent: "right"}} >
                         <AnnonceItem
                        src='assets/images/medi.jpg' 
                        title='medicaments '
                        label='Medicament'
                        desc=' cest la description'
                        username='nada'
                        />
                        <AnnonceItem
                        src='assets/images/lit.jpg' 
                        title='ortho'
                        label='Medicament'
                        desc=' cest la description'
                        username='nada'
                        />
                        <AnnonceItem
                        src='assets/images/chaiseroulante.jpg' 
                        title='ortho'
                        desc=' cest la description'
                        label='Medicament'
                        username='nada'
                        />
        </Grid>
        <Grid style={{display:"flex", flexDirection:"row", position:"relative" , margin:"50px 0 45px" ,justifyContent: "right"}} >
         
        </Grid>
      
      </Grid>
    </React.Fragment>
  );
}
