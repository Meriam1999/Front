import React from 'react';
import '../App.css';
import Details from '../components/AnnonceItems/AnnonceItemDetail';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
function Annonce() {
  return (
    <>
    <Sidebar/>
    <Details />
    <Footer/>
    </>
  );
}

export default Annonce;