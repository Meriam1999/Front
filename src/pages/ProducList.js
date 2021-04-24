import React from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import ProductList from '../components/AnnonceItems/Annonces';
import Sidebar from '../components/NavBar/SideBar2';
function Annonce() {
  return (
    <>
    <Sidebar/>
    <div style={{height:"auto"}}>
    <ProductList/>
    </div>
    <Footer/>
    </>
  );
}

export default Annonce;