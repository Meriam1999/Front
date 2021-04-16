import React from 'react';
import '../App.css';
import {Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import PubAnnonce from '../components/AnnonceItems/pubAnnonce';
import Footer from '../components/Footer/Footer';

 function PublierAnnonce() {
//     const isLogin=localStorage.getItem("user")==="isLogin";
  return (
    <>
    <h1 style={{marginTop:"30px"}}> Publier Une Annonce </h1>
    <PubAnnonce/>
    <Footer/>
    </>

  );
}

export default PublierAnnonce;
