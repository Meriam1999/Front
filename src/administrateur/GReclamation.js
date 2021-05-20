import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Expediteur',
    dataIndex: 'Expediteur',
    key: 'Expediteur',
    render: text => <a>{text}</a>,
  },
  {
    title: 'titre Reclamation',
    dataIndex: 'titreReclamation',
    key: 'titreReclamation',
  },
  {
    title: 'Contenu',
    dataIndex: 'Contenu',
    key: 'Contenu',
  },
   {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
  },
    {
    title: 'Annonce',
    dataIndex: 'Annonce',
    key: 'Annonce',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Supprimer</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    Expediteur: 'John Brown',
    titreReclamation: 'titre de reclamation',
    Contenu:'annonce qui respecte pas le contexte',
    Date:'23/10/2021',
    Annonce:'Annonce'
  },
  
];
function GUser() {
  return (
    <>
    <Sidebar/>
    <div >
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px"  }}
            startDelay={100}
            cursorColor="black"
            text="Traitement des Reclamations"
            typeSpeed={100}
          />
      </div>
      <Table  style={{marginTop:"25px" }}columns={columns} dataSource={data} />
    <Footer/>
    </>
  );
}

export default GUser