import React, { useState, useEffect } from 'react';
import '../../App.css';
import Footer from '../../components/Footer/Footer';
import ImageAcceuil from '../../components/ImageAcceuil/ImageAcceuil';
import Sidebar from '../../components/NavBar/SideBar2';
import 'antd/dist/antd.css';
import '../../components/AnnonceItems/AnnonceItem.css'
import '../../components/AnnonceItems/index.css'
import AnnonceRecherche from "../../components/AnnonceItems/pubCards";
import { Link } from 'react-router-dom';
import { BackTop } from 'antd';
import { Select } from 'antd';
import "./style.css";
import axios from "axios";



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
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/annonce/afficher')
      .then(res => {
        setData(res.data);
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <>
      <Sidebar />
      <ImageAcceuil />
      <div style={{ display: "inline-flex", flexDirection: "row", marginLeft: "500px" }}>
        <h1> Annonces à la Une</h1>
        <Select defaultValue="Annonces De Recherche" style={{ width: "440px", paddingLeft: "200px", paddingTop: "38px" }}>
          <OptGroup label="Annonces">
            <Option value="Annonces De Recherche"> <Link to="/annonceRecherche/annonce"> Annonces De Recherche</Link></Option>
            <Option value="Annonces D'offre/Vente"> <Link to="/"> Annonces D'offre/Vente</Link></Option>
          </OptGroup>
        </Select>
      </div>

      <div className="site-card-border-less-wrapper" >
        <div className="container" >

          {
            data.map((row, index) => {
              if (index === 0 || (index % 2 === 0)) {
                return (
                  <ul>
                    {data.slice(index, index + 2).map((row, index) => {
                      return row.Etat1Anononce == "Validé_Expert" && row.TypeAnnonce == "Annonce de Recherche" ?
                        <AnnonceRecherche
                          idAnnonce={row.id}
                          key={index}
                          src='assets/images/medi.jpg'
                          title={row.Titre}
                          label={row.Etat2Anononce}
                          desc={row.Description}
                          dateAnn={row.Date_Annonce}
                          username='nada'
                          moffre="Annonce de Recherche"
                          lieu={row.Gouvernorat}
                          ville={row.Ville}
                        />
                        : null
                    }
                    )}
                  </ul>
                )
              } else {
                return;
              }
            }
            )}
        </div>
      </div>

      <BackTop>
        <div style={style}  >UP</div>
      </BackTop>
      <Footer />
    </>
  );
}

export default HomeR;