import React from 'react';
import '../App.css';
import Profile from'../components/Profile/ProfileEntier';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';

function userprofile() {
  return (
    <>
    <Sidebar/>
    <Profile/>
    <Footer/>
    </>
  );
}

export default userprofile;
