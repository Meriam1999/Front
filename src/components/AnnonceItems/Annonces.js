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
                console.log('annones :',res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div className='cards'>
            {data.map((item, index)=>
              
                    <div className="card-annonce" >
                       
                            <img src={item.images[0]} class='img-card'  ></img>
                        
            <div className="card-body">
                <h5 className="card-title">{item.Titre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.Description}</h6>
                <p className="card-text">{item.Gouvernorat}</p>
            
        </div>
            </div>
            )}
            
        </div>
    )
}

export default Annonces
