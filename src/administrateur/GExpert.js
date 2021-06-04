import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import './style.css';
import 'antd/dist/antd.css';
import { Table, Input,Popconfirm,Tag, Button, Space,Modal ,Image} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined ,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from'axios';

import {FaUserNurse} from  'react-icons/fa';

function confirm() {
  Modal.confirm({
    title: 'Supprimer un Utilisateur',
    icon: <ExclamationCircleOutlined />,
    content: 'êtes-vous certain de vouloir Supprimer Cet utilisateur?',
    okText: 'Oui',
    cancelText: 'Annuler',
   
  });
}

export default class GExpert extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
     tableData: [{
                      _id:'',
                      dateInscription :'',
                      Nom:'',
                      Prenom:'',
                      Nom_utilisateur:'',
                      Photo_profile:'',
                      Mot_de_passe:'',
                      Genre:[''],
                      Email:'',
                      etat:[''],
                      job:[''],
                      Numero_telephone:''
                }],
    
  };
  /***************Partie Recuperation des utilisateurs de la base de donnees*/
componentDidMount() {
        axios.get('/expert/afficher')
            .then(res => {
                this.setState({ tableData: res.data });
                console.log(res.data)
            })
            .catch(function (error) {
              
                console.log(error);
            })
          }

  /*************Suppression et rendre un simple Utilisateur************ */

   convertirEnUser = (_id,record,e) => {
            e.preventDefault();
            const NExpert = record
             axios.delete(`/expert/supprimer/${_id}`)  
          .then(res => {  
            console.log(res);  
            console.log(res.data);  
            const tableData = this.state.tableData.filter(item => item._id !== _id);  
            this.setState({ tableData });  
      }).catch((error) => {
                console.log(error.response)
            });

            const NExpert1 ={
              
                dateInscription :NExpert.dateInscription,
                Nom: NExpert.Nom,
                Prenom: NExpert.Prenom,
                Nom_utilisateur:NExpert.Nom_utilisateur,
                Photo_profile:NExpert.Photo_profile,
                Mot_de_passe:NExpert.Mot_de_passe,
                Genre:NExpert.Genre,
                Email:NExpert.Email,
                etat:'Utilisateur',
                Numero_telephone:NExpert.Numero_telephone,
            };
             axios.post('/user/ajouter',NExpert1)  
            .then(res => {  
              console.log(res);  
              console.log(res.data);  
            
            }).catch((error) => {
                console.log(error.response)
            });
            
            
          }

  /******************Partie Recherche************ */

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
             Chercher
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Annuler
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filtrer
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

 

  render() {
    const { tableData } = this.state;
   const columns = [
     
  {
    title: 'Nom',
    dataIndex: 'Nom',
    accessor: 'Nom',
    key: 'Nom',
     ...this.getColumnSearchProps('Nom'),
  },
  {
    title: 'Prenom',
    dataIndex: 'Prenom',
    accessor: 'Prenom',
    key: 'Prenom',
     ...this.getColumnSearchProps('Prenom'),
  },
  {
    title: "Nom d'utilisateur",
    dataIndex: 'Nom_utilisateur',
    accessor: 'Nom_utilisateur',
    key: 'Nom_utilisateur',
     ...this.getColumnSearchProps('Nom_utilisateur'),

  },
 
  {
    title: 'Sexe',
    dataIndex: 'Genre',
    accessor: 'Genre',
    key: 'Genre',
    ...this.getColumnSearchProps('Genre'),
      render: Genre => (
      <>
        {Genre.map(Etat => {
          let color="red";
          if (Etat === 'Femme') {
            color = 'pink';
          }else if(Etat==='Homme'){
            color = 'green';}
            else {
              color ='red'
            }
      
          return (
            <Tag color={color} key={Etat}>
              {Etat.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
 
  },
  {
    title: 'Email',
    dataIndex: 'Email',
    accessor: 'Email',
    key: 'Email',
     ...this.getColumnSearchProps('Email'),
  },
  {
    title: "Numero telephone",
    dataIndex: 'Numero_telephone',
    accessor: 'Numero_telephone',
    key: 'Numero_telephone',
     ...this.getColumnSearchProps('Numero_telephone'),
  },
  // {
  //   title: 'Date Inscription',
  //   dataIndex: 'dateInscription',
  //   accessor:'dateInscription',
  //   key: 'dateInscription',
  //    ...this.getColumnSearchProps('dateInscription'),
  // },
  // {
  //   title: 'Photo Profile',
  //   accessor:'Photo_profile',
  //   dataIndex: 'Photo_profile',
  //   key: 'Photo_profile',
  //    ...this.getColumnSearchProps('Photo_profile'),
  // },
  {
    title: 'Job',
    dataIndex: 'job',
    accessor:'job',
    key: 'job',
     ...this.getColumnSearchProps('job'),
    //   render: job => (
    //   <>
    //     {job.map(Etat => {
    //       let color="red";
    //       if (Etat === 'Pharmacien(ne)') {
    //         color = 'blue';
    //       }
    //         else {
    //           color ='red'
    //         }
      
    //       return (
    //         <Tag color={color} key={Etat}>
    //           {Etat.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
     
  },
   {
    title: 'Photo Profile',
    dataIndex: ' Photo_profile',
    accessor:'Photo_profile',
    key: ' Photo_profile',
     ...this.getColumnSearchProps(' Photo_profile'),
      render: (record) =>(
        <>
        <Image src="https://source.unsplash.com/random" alt="" style={{width:"80px",height:"80px",borderRadius:"50%"}} />
        </>
      )
  },
  {
    title: 'Action',
    key: 'action',
     render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
            <ul>
            <Popconfirm title="êtes-vous sûr de vouloir supprimer cet Expert et le rendre un simple utilisateur ?" onConfirm={(e) => this.convertirEnUser(record._id,record,e)}>
            <li> <a>Rendre user</a></li> 
            </Popconfirm> <br/>
            </ul>
           </>
          ) : null,
  },
];
    

return (
    <>
    <Sidebar/>
    <div>
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px" }}
            startDelay={100}
            cursorColor="black"
            text="Gestion Des Experts"
            typeSpeed={100}
          />
     <FaUserNurse  style={{fontSize:"40px",marginLeft:"620px" ,color:"#ff9933"}} />
    <Table style={{marginTop:"25px"}} columns={columns} dataSource={tableData} />
    </div>
    <Footer/>
    </>
  );
  
  }
}


/*************************************************** */

