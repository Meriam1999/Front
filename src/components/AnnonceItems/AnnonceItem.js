import React from 'react'
import {Link} from 'react-router-dom';
import './AnnonceItem.css';
function AnnonceItem(props) {
    return (
       <>
        <li className="cards__item">
            <Link className="cards__item__link" to={props.path} >
                <figure  style={{transform: "scale(1.1)"}}  className="cards__item__pic-wrap" data-category={props.label}>
                    <img className="cards__item__img"
                    src={props.src} 
                    alt="medicament" 
                    />
                </figure>
               <div className="cards__item__info" >
                   <h5 className="cards__item__text"> {props.text}</h5>
               </div>
            </Link>
        </li>
       </>
    )
}

export default AnnonceItem;
