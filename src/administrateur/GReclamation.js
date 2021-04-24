import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';


function GUser() {
  return (
    <>
    <Sidebar/>
    <div style={{height:"700px"}}>
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px"  }}
            startDelay={100}
            cursorColor="black"
            text="Traitement des Reclamations"
            typeSpeed={100}
          />
      </div>
    <Footer/>
    </>
  );
}

export default GUser