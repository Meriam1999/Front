import React, {useState, useEffect} from 'react'


export const AuthContext=React.createContext();
export  function AuthProvider(props){
    const [auth, setAuth]=useState({
      
    });


    useEffect (()=>{
        const id=localStorage.getItem('userId');
     
        const token=localStorage.getItem('token');

        if(id){
            setAuth({id,token});
        }
    }, [])

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}