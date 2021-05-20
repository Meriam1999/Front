import React from 'react';
import '../App.css';
import './style.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
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
    title: 'Action',
    key: 'action',
    render: (text, record) => (
       <Space size="middle">
          <a>Approuver</a>
          <a>Rejeter</a>
        </Space>
    ),
  },
   {
    title: 'Approuvée',
    key: 'Approuvée',
    dataIndex: 'Etat',
    render: Etat => (
      <>
        {Etat.map(tag => {
          let color="red";
          if (tag === 'true') {
            color = 'green';
          }
            else {
              color ='red'
            }
      
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
   ),
    
  }
];

const data = [
  {
    key: '1',
    expediteur: 'Bouslama nada',
    contenu: 32,
    Date: '03/05/2021',
    Etat:['true']
  },
  {
    key: '1',
    expediteur: 'mariem2020',
    contenu: 32,
    Date: '03/05/2021',
    Etat:['false']
  },
  {
    key: '1',
    expediteur: 'asma22',
    contenu: 32,
    Date: '03/05/2021',
    Etat:['false']
  },

];


const Gordonnances=()=>{
  return (
    <>
    <Sidebar/>
    <div style={{height:"700px"}}>
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px" }}
            startDelay={100}
            cursorColor="black"
            text="Gestion Des Ordonnances"
            typeSpeed={100}
          />
    <Table  style={{marginTop:"25px"}}columns={columns} dataSource={data} />
    </div>
    <Footer/>
    </>
  );
}

export default Gordonnances