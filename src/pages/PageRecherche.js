import React, { useState, useEffect } from 'react'
import '../App.css';

import Annonces from '../components/AnnonceItems/Annonces';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { BackTop } from 'antd';
import VenteHomePage, { Search } from "../pages/Sous-pages/AnnonceVente"
import AnnoncesItem from "../components/AnnonceItems/AnnonceItem"
import 'antd/dist/antd.css';
import SearchPage from "../components/SearchBar/SearchPage"


function PageRecherche() {

    return (
        <div>
            <Sidebar />
            <SearchPage />
            <Footer />
        </div>
    )
}

export default PageRecherche
