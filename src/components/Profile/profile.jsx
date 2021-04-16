import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


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

export default function Profile() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div  className={classes.container}  container>
        <img
          className={classes.profileImage}
          alt="Nom et prenom"
          src="https://source.unsplash.com/random"
        />
        <div style={{marginTop:"10px"}} className={classes.content}>
          <Typography  component="h1" variant="h4">
            Nom Prenom
          </Typography>
          <Button style={{marginTop:"10px"}} to="/publierannonce" variant="outlined" color="primary" fullWidth>
            Publier Annonce
          </Button>

          <Button style={{marginTop:"15px"}} to="/" variant="outlined" color="primary" fullWidth>
            modifier profile
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}