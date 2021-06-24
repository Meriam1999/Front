import React, { useState, UseEffect } from 'react'
import AnnoncesItem from "../AnnonceItems/AnnonceItem"

const AnnonceList = (props) => {
    return (
        <div>
            <div className='cards'>
                <div className="cards__container">
                    <div className="cards__wrapper">
                        {
                            props.AnnonceList.map((row, index) => {
                                if (index === 0 || (index % 3 === 0)) {
                                    return (
                                        <ul className="cards__items">
                                            {props.AnnonceList.slice(index, index + 3).map((row, index) => {
                                                return row.Etat1Anononce == "Validé_Expert" && row.TypeAnnonce == "Annonce d'offre gratuit /Vente(Prix Symbolique)" ?
                                                    <AnnoncesItem
                                                        idAnnonce={row.id}
                                                        key={index}
                                                        src='assets/images/medi.jpg'
                                                        title={row.Titre}
                                                        label={row.Etat2Anononce}
                                                        desc={row.Description}
                                                        dateAnn={row.Date_Annonce}
                                                        prix={row.Prix}
                                                        username={row.userName}
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
    )
}

export default AnnonceList
