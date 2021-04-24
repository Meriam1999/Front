import React from 'react';
import '../App.css';
import TypeWriterEffect from 'react-typewriter-effect';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
import 'antd/dist/antd.css';
import {HeartTwoTone} from '@ant-design/icons';


function Annonce() {
  return (
    <>
    <Sidebar/>
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px"  }}
            startDelay={100}
            cursorColor="black"
            text="Mes Favoris"
            typeSpeed={100}
          />  
    <HeartTwoTone  twoToneColor="#ff0000" style={{fontSize:"40px",marginLeft:"620px"}} />

    
    <Footer/>
    </>
  );
}

export default Annonce;