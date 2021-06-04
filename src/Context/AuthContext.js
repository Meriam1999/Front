import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';
import { StylesProvider } from '@material-ui/styles';
import SelectInput from '@material-ui/core/Select/SelectInput';

const AuthContext = createContext();
const sleep = milliseconds => { return new Promise(resolve => setTimeout(resolve, milliseconds)) };

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        sleep(1000).then(() => setLoggedIn(true));
    }

    const logout = () => {
        sleep(1000).then(() => setLoggedIn(false));
    }
    // async function getLoggedIn() {
    //     const loggedInRes = await axios.get('/user/loggedIn');
    //     setLoggedIn(loggedInRes.data)
    // }

    useEffect(() => {
        // localStorage.getItem('userId');
        // localStorage.getItem('token');
    }, []);

    const AuthContextValue = {
        login,
        loggedIn,
        logout
    };
    return (<AuthContext.Provider value={AuthContextValue} >
        {props.children}
    </AuthContext.Provider>
    );
}

const useAuth = () => React.useContext(AuthContext)

export default AuthContext;
export { AuthContextProvider, useAuth };
