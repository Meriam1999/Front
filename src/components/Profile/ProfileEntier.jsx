import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile";
import AnnonceItem from '../AnnonceItems/AnnonceItem';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },

}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Login() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid  container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
          <div  className={classes.paper}>
            <Profile />
          </div>
        </Grid>
        <Grid>
        <AnnonceItem />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
