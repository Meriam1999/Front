import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import Profile from'../components/Profile/ProfileEntier';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios'

function ProfileUser() {
const [user,setUser]= useState([])
const authContext=useContext(AuthContext);
   useEffect (()=>{
         axios.get('http://localhost:4000/user/afficher')
            .then(res => {
               setUser(res.data);
                console.log(res.data)
            })
            .catch(function (error) {
              
                console.log(error);
            })
    }, [])



  return (
    <>
    <Sidebar/>
    {user.map((item) => 
    item._id==authContext.auth.id?
    <>
   <div>{item.Nom}</div>
   <div>{item.Prenom}</div>
   <div>{item.Email}</div>
   
     <Profile /></>: null
    )}
    <Footer/>
    </>
  );
}

export default ProfileUser;
