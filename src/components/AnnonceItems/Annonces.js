import React from 'react'
import AnnoncesItem from './AnnonceItem';
import './AnnonceItem.css';
import { Parallax } from 'rc-scroll-anim';

function Annonces() {
    return (
        <div className='cards'>
            <h1>Annonces à la une</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                <Parallax
          animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
          style={{ transform: 'translateX(-100px)', opacity: 0 }}
          className="cards__items"
        >
                    <ul className="cards__items"> 
                    {/* ce Code est statique , il faut le changer avec la base de donne  */}
                        <AnnoncesItem
                        src='assets/images/medi.jpg' 
                        text='medicaments '
                        label='Medicament'
                        path='/details'/>
                        <AnnoncesItem
                        src='assets/images/lit.jpg' 
                        text='ortho'
                        label='Medicament'
                        path='/details'/>
                        <AnnoncesItem
                        src='assets/images/chaiseroulante.jpg' 
                        text='ortho'
                        label='Medicament'
                        path='/details'/>
                    </ul> 
                    </Parallax>
                    <Parallax
          animation={{ x: 0, opacity: 1, playScale: [0.2, 0.8] }}
          style={{ transform: 'translateX(-100px)', opacity: 0 }}
          className="cards__items"
        >
                    <ul className="cards__items">
                        <AnnoncesItem
                        src='assets/images/medi.jpg' 
                        text='medicaments '
                        label='Medicament'
                        path='/details'/>
                        <AnnoncesItem
                        src='assets/images/lit.jpg' 
                        text='ortho'
                        label='Medicament'
                        path='/details'/>
                        <AnnoncesItem
                        src='assets/images/chaiseroulante.jpg' 
                        text='ortho'
                        label='Medicament'
                        path='/details'/>
                    </ul>
                    </Parallax>
                </div>
            </div>
        </div>
    )
}

export default Annonces
