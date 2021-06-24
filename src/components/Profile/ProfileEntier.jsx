import React from "react";
import './styling.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile";
import { useParams } from "react-router-dom";

import PubCard from '../AnnonceItems/pubCards';
import {useContext, useEffect,useState} from "react";
import axios from"axios";
import { AuthContext } from '../../Context/AuthContext';

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
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([])
const { id } = useParams()
   useEffect(() => {
        axios.get('http://localhost:4000/annonce/afficher')
            .then(res => {
                setData(res.data);
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
  return (
    <React.Fragment>
      <Grid  container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <div  className={classes.paper}>
            <Profile id={id} />
          </div>
        </Grid>
      
        <Grid style={{display:"flex", flexDirection:"row", position:"relative" , margin:"50px 0 45px" ,justifyContent: "right"}} >
                          {
                        data.map((row, index) => {
                            if (index === 0 || (index % 2 === 0)) {
                                 return (
                                    <ul className="cards__items">
                                        {data.slice(index, index + 2).map((row, index) => {
                                            
                                            return row.userId == id && row.Etat1Anononce == "Validé_Expert" && row.TypeAnnonce == "Annonce d'offre gratuit /Vente(Prix Symbolique)" ?
                                            <AnnonceItem
                                              path={`/profile/${row.userId}`}
                                              pathBack={`/profile/${row.userId}`}
                                              id={row._id}
                                                key={index}
                                                src='assets/images/lit2.jpg'
                                                title={row.Titre}
                                                label={row.Etat2Anononce}
                                                desc={row.Description}
                                                dateAnn={row.Date_Annonce}
                                                prix={row.Prix}
                                                iduser={row.userId}
                                                username={row.userName}
                                                moffre={row.TypeAnnonce}
                                                lieu={row.Gouvernorat}
                                                ville={row.Ville}
                                            />
                                              : null
                                          })}
                                    </ul>
                               );
                            
                            }})}
        </Grid>
        <Grid style={{display:"flex", flexDirection:"row", position:"relative" , margin:"50px 0 45px" ,justifyContent: "right"}} >
         
        </Grid>
      
      </Grid>
    </React.Fragment>
  );
}
