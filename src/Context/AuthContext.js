import React, { useState, useEffect } from 'react'


export const AuthContext = React.createContext();
export function AuthProvider(props) {
    const [auth, setAuth] = useState({
    });
    const [state, setState] = useState([])
    const [recherche, setRecherche] = useState([]);
    const File = (props) => {
        setState(props)
    }
    const Recherche = (props) => {
        setRecherche(props)
    }
    useEffect(() => {
        const id = localStorage.getItem('userId');
        const nom = localStorage.getItem('nom');
        const role = localStorage.getItem('role')
        const token = localStorage.getItem('token');

        if (id) {
            setAuth({ id, token, nom, role });
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, state, File, recherche, Recherche }}>
            {props.children}
        </AuthContext.Provider>
    )
}