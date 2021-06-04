import React from 'react'
import AnnoncesItem from './AnnonceItem';
import './AnnonceItem.css';
import { Parallax } from 'rc-scroll-anim';

function Annonces() {
    return (
        <div className='cards'>
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
                        title='medicaments '
                        label='Disponible'
                        desc=' cest la description cest la descriptiondesc=Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Ariana'
                        />
                        <AnnoncesItem
                        src='assets/images/lit.jpg' 
                        title='Lit Orthopedique'
                        label='Disponible'
                        desc=' cest la descriptiondesc=Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='tunis'
                        />
                        <AnnoncesItem
                        src='assets/images/chaiseroulante.jpg' 
                        title='ortho'
                        desc=' cest la descriptiondesc=Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        label='Resolue'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Monastir'
                        />
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
                        title='Disponible'
                        desc='Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        label='Medicament'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Ariana'
                       />
                        <AnnoncesItem
                        src='assets/images/lit.jpg' 
                        title='lit ortho'
                        desc=' cest la description'
                        label='Resolue'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Ariana'
                        />
                        <AnnoncesItem
                        src='assets/images/chaiseroulante.jpg' 
                        title='chaise roulante'
                        desc=' cest la description'
                        label='Disponible'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Ariana'
                        />
                    </ul>
                    </Parallax>
                    <Parallax
          animation={{ x: 0, opacity: 1, playScale: [0.5, 0.8] }}
          style={{ transform: 'translateX(-100px)', opacity: 0 }}
          className="cards__items"
        >
                    <ul className="cards__items"> 
                    {/* ce Code est statique , il faut le changer avec la base de donne  */}
                        <AnnoncesItem
                        src='assets/images/medi.jpg' 
                        title='medicaments '
                        label='Resolue'
                        desc=' cest la description cest la descriptiondesc=Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Ariana'
                        />
                        <AnnoncesItem
                        src='assets/images/lit.jpg' 
                        title='Lit Orthopedique'
                        label='Disponible'
                        desc=' cest la descriptiondesc=Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='tunis'
                        />
                        <AnnoncesItem
                        src='assets/images/chaiseroulante.jpg' 
                        title='ortho'
                        desc=' cest la descriptiondesc=Avec cette nouvelle catégorie, La souris qui raconte inaugure une nouvelle façon de dire les choses… enfin de les écrire ! Céline Druon-Petitet est rédactrice, chargée de communication puis libraire pendant un temps. Un jour elle crée « C’était écrit », l’entreprise qui rédige tout ce que vous ne pouvez pas écrire. Rencontrée par une belle journée d’avril, je lui fais part de mon souhait d'
                        label='Disponible'
                        username='nada'
                        moffre='offre volontaire(gratuit)'
                        lieu='Monastir'
                        />
                    </ul> 
                    </Parallax>
                </div>
            </div>
        </div>
    )
}

export default Annonces
