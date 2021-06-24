import React, { useState, useEffect, useContext } from 'react'
import SearchBar from './SearchBar';
import AnnonceList from './AnnonceList';
import { AuthContext } from '../../Context/AuthContext';

const SearchPage = () => {
    const authContext = useContext(AuthContext);
    // const [input, setInput] = useState('');
    // const [annonceListDefault, setAnnonceListDefault] = useState();
    // const [annonceList, setAnnonceList] = useState();

    // const fetchData = async () => {
    //     return axios.get('http://localhost:4000/annonce/afficher')
    //         .then(res => {
    //             setAnnonceListDefault(res.data);
    //             setAnnonceList(res.data)
    //             console.log(res.data)
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }
    // const updateInput = async (input) => {
    //     const filtered = annonceListDefault.filter(annonce => {
    //         return annonce.Titre.toLowerCase().includes(input.toLowerCase())
    //     })
    //     setInput(input);
    //     setAnnonceList(filtered);
    // }

    // useEffect(() => { fetchData() }, []);
    return (
        <div>
            <h1>Resultat de Recherche</h1>
            <AnnonceList AnnonceList={authContext.recherche} onChange={console.log("ellistaa", authContext.recherche)} />
        </div>
    )
}

export default SearchPage
