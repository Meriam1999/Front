import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Titre',
    dataIndex: 'Titre',
    key: 'Titre',
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    key: 'Description',
  },
   {
    title: 'Date Fabrication',
    dataIndex: 'DateFabrication',
    key: 'DateFabrication',
  },
  {
    title: 'Date Expiration',
    dataIndex: 'DateExpiration',
    key: 'DateExpiration',
  },
  {
    title: 'Dosage',
    dataIndex: 'Dosage',
    key: 'Dosage',
  },
  
   {
    title: 'DateAnnonce',
    dataIndex: 'DateAnnonce',
    key: 'DateAnnonce',
  },
   {
    title: 'Prix',
    dataIndex: 'Prix',
    key: 'Prix',
  },
  {
   title: 'imageDefaut',
    dataIndex: 'imageDefaut',
    key: 'imageDefaut',
  },
  {
   title: 'images',
    dataIndex: 'images',
    key: 'images',
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
    title: 'Etat',
    key: 'Etat',
    dataIndex: 'Etat',
    render: Etat => (
      <>
        {Etat.map(tag => {
          let color="red";
          if (tag === 'En_Attente_Expert') {
            color = 'orange';
          }else if(tag==='Validé_Expert'){
            color = 'green';}
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
    )
      }
];
const data = [
  {
   key: '1',
    Titre:' bouteile oxygene oxygene',
    Description:'Quid enim tam absurdum quam delectari multis inanimis rebus, ',
    DateFabrication:'03/05/2021',
    DateExpiration:'03/05/2021',
    Dosage:'10mg',
    DateAnnonce: '03/05/2021',
    Prix:'20',
    imageDefaut:'',
    images:'',
    Etat:['En_Attente_Expert']
  },
  {
    key: '1',
    Titre:' bouteile oxygene oxygene',
    Description:'Quid enim tam absurdum quam delect? Nihum officiorumque iucundius.',
    DateFabrication:'03/05/2021',
    DateExpiration:'03/05/2021',
    Dosage:'10mg',
    DateAnnonce: '03/05/2021',
    Prix:'20',
    imageDefaut:'',
    images:'',
    Etat:['En_Attente_Expert']
  },
  {
    key: '1',
    Titre:' bouteile oxygene oxygene',
    Description:'Quid enim tam absurdum quam delectari multis inanimis rebus, ut honore, ut gloria, ut aedificio, ut vestitu cultuque corporis, animante virtute praedito, eo qui vel amare vel, ut ita dicam, redamare possit, non admodum delectari? Nihil est enim remuneratione benevolentiae, nihil vicissitudine studiorum officiorumque iucundius.',
    DateFabrication:'03/05/2021',
    DateExpiration:'03/05/2021',
    Dosage:'10mg',
    DateAnnonce: '03/05/2021',
    Prix:'20',
    imageDefaut:'',
    images:'',
    Etat:['En_Attente_Expert']
  },
];


const GAnnoncemMedic=()=>{
  return (
    <>
    <Sidebar/>
    <div>
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px" }}
            startDelay={100}
            cursorColor="black"
            text="Gestion Des Annonces de Médicaments"
            typeSpeed={100}
          />
    <Table  style={{marginTop:"25px" }}columns={columns} dataSource={data} />
    </div>
    <Footer/>
    </>
  );
}

export default GAnnoncemMedic