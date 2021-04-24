import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';


function HomePage() {
  return (
    <>
    <Sidebar/>
    <div style={{height:"900px"}}>
        
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center",fontWeight:"bold",marginTop:"20px"}}
            startDelay={100}
            cursorColor="black"
            text="Welcome Admin"
            typeSpeed={100}
          />
    </div>
    <Footer/>
    </>
  );
}

export default HomePage;