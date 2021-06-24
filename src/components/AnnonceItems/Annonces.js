import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import AnnoncesItem from './AnnonceItem';
import './AnnonceItem.css';
import { generatePath } from 'react-router';
import { Parallax } from 'rc-scroll-anim';
import axios from "axios"

const Annonces = () => {
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
        <div className='cards'>
            <div className="cards__container">
                <div className="cards__wrapper">
                    {
                        data.map((row, index) => {
                            if (index === 0 || (index % 3 === 0)) {

                                return (<Parallax
                                    key={index}
                                    animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
                                    style={{ transform: 'translateX(-100px)', opacity: 0 }}
                                    className="cards__items"
                                >
                                    <ul className="cards__items">
                                        {data.slice(index, index + 3).map((row, index) => {
                                            return row.Etat1Anononce == "Validé_Expert" && row.TypeAnnonce == "Annonce d'offre gratuit /Vente(Prix Symbolique)" ?
                                                <>
                                                    {/* <p>Id: {id}</p> */}
                                                    <AnnoncesItem
                                                        path="/annonce"
                                                        pathBack="/"
                                                        id={row._id}
                                                        key={index}
                                                        src="./assets/images/lit2.jpg"
                                                        title={row.Titre}
                                                        label={row.Etat2Anononce}
                                                        desc={row.Description}
                                                        dateFab={row.DateFabrication}
                                                        dateExp={row.DateExpiration}
                                                        dateAnn={row.Date_Annonce}
                                                        prix={row.Prix}
                                                        username={row.userName}
                                                        iduser={row.userId}
                                                        moffre="Annonce d'offre gratuit/Vente"
                                                        lieu={row.Gouvernorat}
                                                        ville={row.Ville}
                                                    />
                                                </>
                                                : null
                                        })}
                                    </ul>
                                </Parallax>);
                            } else {
                                return;
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Annonces
