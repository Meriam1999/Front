import React from 'react';
import '../App.css';
import Annonces from '../components/AnnonceItems/Annonces';
import Footer from '../components/Footer/Footer';
import ImageAcceuil from '../components/ImageAcceuil/ImageAcceuil';
import ScrollUp from '../components/ScrollUp.js/ScrollUp';


function Home() {
  return (
    <>
    <ImageAcceuil />
    <Annonces />
    <Footer/>
    </>
  );
}

export default Home;