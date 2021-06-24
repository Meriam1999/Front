import React, { useEffect, useState, useContext } from 'react';
import '../App.css';
import Profile from '../components/Profile/ProfileEntier';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios'

function ProfileUser() {




  return (
    <>
      <Sidebar />
      <Profile />
      <Footer />
    </>
  );
}

export default ProfileUser;
