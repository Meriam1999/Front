import React, { useState, useEffect } from 'react';
import '../App.css';
import AnnoncesItem from "../components/AnnonceItems/AnnonceItem";
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
import '../components/AnnonceItems/index.css';
import '../components/AnnonceItems/AnnonceItem.css';
import axios from "axios";
function Annonce() {
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
      <div style={{ height: "auto" }}>
        <center><h1> Annonces Médicament </h1></center>
        <div className='cards'>
          <div className="cards__container">
            <div style={{ position: "relative", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
              {
                data.map((row, index) => {
                  if (index === 0 || (index % 3 === 0)) {

                    return (
                      <ul className="cards__items">
                        {data.slice(index, index + 3).map((row, index) => {
                          return row.Etat1Anononce == "Validé_Expert" && row.TypeAnnonce == "Annonce d'offre gratuit /Vente(Prix Symbolique)" && row.Catégorie == "Medicament" ?
                            <AnnoncesItem
                              path="/medicament"
                              pathBack="/medicament"
                              id={row._id}
                              key={index}
                              src='assets/images/medi.jpg'
                              title={row.Titre}
                              label={row.Etat2Anononce}
                              desc={row.Description}
                              dateAnn={row.Date_Annonce}
                              prix={row.Prix}
                              username='nada'
                              moffre="Annonce d'offre gratuit/Vente"
                              lieu={row.Gouvernorat}
                              ville={row.Ville}
                            />
                            : null
                        })}
                      </ul>
                    );
                  } else {
                    return;
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Annonce;