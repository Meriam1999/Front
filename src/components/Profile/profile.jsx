import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  profileImage: {
    width: "170px",
    height:"170px",
    borderRadius:"100px"
  },
  content: {
    justifyContent: "right",
    textAlign: "right"
  },
  details: {
    marginTop: "-20px"
  },
  chip: {
    padding: "0 5px",
    margin: "2px 5px"
  },
  about: {
    margin: "10px 0",
    alignItems: "right",
    textAlign: "right"
  },
  container: {
    float:"right",
    marginRight:"2px;",
    textAlign:"center"
  }

}));

export default function Profile(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div  className={classes.container}  style={{height:"auto"}}>
        <img
          className={classes.profileImage}
          alt="Nom et prenom"
          src="https://source.unsplash.com/random"
        />
        <div style={{marginTop:"10px"}} className={classes.content}>
          <Typography  component="h1" variant="h4">
            {props.nom + ' ' + props.prenom}
          </Typography>
          <p style={{color:"grey",marginRight:"75px"}} > 3 publications</p>
          <Link to='/publierannonce'>  <Button style={{marginTop:"10px"}} to="/publierannonce" variant="outlined" color="primary" fullWidth>
            Publier Annonce
          </Button>
          </Link> 
          <Link to='/favoris'>
          <Button style={{marginTop:"15px"}} variant="outlined" color="primary" fullWidth>
            Voir mes favoris
          </Button>
          </Link>
          <Link to='/profil/parametres'>
          <Button style={{marginTop:"15px"}} variant="outlined" color="primary" fullWidth>
            modifier profile
          </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
