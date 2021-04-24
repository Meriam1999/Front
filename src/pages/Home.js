import React from 'react';
import '../App.css';
import Annonces from '../components/AnnonceItems/Annonces';
import Footer from '../components/Footer/Footer';
import ImageAcceuil from '../components/ImageAcceuil/ImageAcceuil';
import Sidebar from '../components/NavBar/SideBar2';
import 'antd/dist/antd.css';
import { BackTop } from 'antd';
import ChatVirtual from "../components/VirtualChat/chat";

const style = {
  height: 50,
  width: 50,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 20,
  background: "#adebad",
};
function Home() {
  return (
    <>
    <Sidebar/>
    <ImageAcceuil />
    <Annonces />
    {/* <ChatVirtual/> */}
    <BackTop>
      <div style={style}  >UP</div>
    </BackTop>
    <Footer/>
    </>
  );
}

export default Home;