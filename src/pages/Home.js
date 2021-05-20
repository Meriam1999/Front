import React from 'react';
import '../App.css';
import Annonces from '../components/AnnonceItems/Annonces';
import Footer from '../components/Footer/Footer';
import ImageAcceuil from '../components/ImageAcceuil/ImageAcceuil';
import Sidebar from '../components/NavBar/SideBar2';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { BackTop } from 'antd';
import 'antd/dist/antd.css';

import { Select } from 'antd';

const { Option, OptGroup } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const style = {
  height: 50,
  width: 50,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 20,
  background: "#adebad",
};

  
function Home() {
  return (
    <>
    <Sidebar/>
    <ImageAcceuil />
  
  <div>
      <h1> Annonces à la Une</h1>
  
    <Select defaultValue="Annonces D'offre/Vente" style={{ width: 300 }} onChange={handleChange}>
    <OptGroup label="Annonces">
      <Option value="Annonces De Recherche"> <Link to="/accueil/VenteRecherche"> Annonces De Recherche</Link></Option>
      <Option value="Annonces D'offre/Vente"> <Link to="/accueil/VenteRecherche"> Annonces D'offre/Vente</Link></Option>
    </OptGroup>
    </Select>
    </div>
    <Annonces />
    {/* <ChatVirtual/> */}
    <BackTop>
      <div style={style}  >UP</div>
    </BackTop>
    <Footer/>
    </>
  );
}

export default Home;