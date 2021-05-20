import React from 'react';
import '../../App.css';
import Annonces from '../../components/AnnonceItems/Annonces';
import Footer from '../../components/Footer/Footer';
import ImageAcceuil from '../../components/ImageAcceuil/ImageAcceuil';
import Sidebar from '../../components/NavBar/SideBar2';
import 'antd/dist/antd.css';
import Cards from '../../components/AnnonceItems/pubCards';
import { Link } from 'react-router-dom';
import { BackTop } from 'antd';
import { Select } from 'antd';


const { Option, OptGroup } = Select;


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

function HomeR() {
  return (
    <>
    <Sidebar/>
    <ImageAcceuil />
    <div style={{display:"inline-flex" ,flexDirection:"row",marginLeft:"500px"}}>
      <h1> Annonces à la Une</h1>
    <Select defaultValue="Annonces De Recherche" style={{ width:"410px",paddingLeft:"200px",paddingTop:"38px"}}>
    <OptGroup label="Annonces">
      <Option value="Annonces De Recherche"> <Link to="/accueil/VenteRecherche"> Annonces De Recherche</Link></Option>
      <Option value="Annonces D'offre/Vente"> <Link to="/"> Annonces D'offre/Vente</Link></Option>
    </OptGroup>
    </Select>
    </div>
   
   <div>
       <Cards/>
   </div>
   
    <BackTop>
      <div style={style}  >UP</div>
    </BackTop>
    <Footer/>
    </>
  );
}

export default HomeR;