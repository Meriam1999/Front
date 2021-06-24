import React, { useContext } from 'react';
import '../App.css';
import TypeWriterEffect from 'react-typewriter-effect';
import PubAnnonce from '../components/AnnonceItems/pubAnnonce';
import Footer from '../components/Footer/Footer';
import "antd/dist/antd.css";
import './style.css';
import { Redirect } from "react-router-dom";

import Sidebar from '../components/NavBar/SideBar2';
import { Tabs } from 'antd';
import Pubrecherche from '../components/AnnonceItems/PubRecherche';
import { AuthContext } from '../Context/AuthContext';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}


const contentStyle = {
  height: "700px",
  color: "#adebad",
  lineHeight: "300px",
  textAlign: "center",
  background: "yellow"
};
const PublierAnnonce = () => {
  //     const isLogin=localStorage.getItem("user")==="isLogin";
  const authContext = useContext(AuthContext);
  let loggedIn = false;
  if (authContext.auth.id) {
    loggedIn = true;
  }
  const headertext = [
    { 'text': '<div><h3> De Vente </h3></div>' },
    { 'text': '<div><h3> De Recherhce</h3></div>' }
  ];

  const style1 = {
    fontWeight: "bold",
    color: "Grey",
    letterSpacing: "2px",
    marginLeft: "475px",
    marginTop: "20px"

  }
  return (
    <>
      {loggedIn === true ? <>
        <Sidebar />
        <TypeWriterEffect
          textStyle={{ fontFamily: "sans-serif", textAlign: "center", fontWeight: "bold", marginTop: "25px", marginLeft: "30px" }}
          startDelay={100}
          cursorColor="black"
          text="Publier une Annonce"
          typeSpeed={100}
        />

        <center>

          <Tabs tabBarStyle={style1} tabBarGutter="10px" onChange={callback} type="card" >
            <TabPane tab="D'offre/De Vente" size="large" key="1" className="profile-tabitem" >
              <div style={{ marginTop: "20px", backgroundColor: "#f2f2f2", width: "90%", borderRadius: "5px" }}>
                <center><PubAnnonce /></center>

              </div>
            </TabPane>
            <TabPane tab="De Recherche" key="2" >
              <div style={{ marginTop: "20px", backgroundColor: "#f2f2f2", width: "90%", borderRadius: "5px" }}>

                <center> <Pubrecherche /></center>
              </div>
            </TabPane>
          </Tabs>
        </center>
        <Footer />
      </> : <>
        <Redirect to="/connexion" />
      </>}
    </>

  );
}

export default PublierAnnonce;
