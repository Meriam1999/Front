import React, { useState, useContext } from 'react'
import { Input } from 'antd';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';

const { Search } = Input;

const SearchBar = (props) => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const routeChange = () => {

        history.push('/recherche');
    }
    const [keyword, setKeyword] = useState("")
    return (
        <Search className="searchBar"
            onSearch={routeChange}
            key="random1"
            placeholder="Que cherchez-vous?"
            value={keyword}
            onChange={(event) => {
                // setKeyword(event.target.value);
                // authContext.Recherche(event.target.value);
                // console.log("valeur context", authContext.recherche)
            }}
            /*onSearch={handleSearch}*/
            style={{ width: "240px", borderRadius: "4px" }} />
    )
}

export default SearchBar
