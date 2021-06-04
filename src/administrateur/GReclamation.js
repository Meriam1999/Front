import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Table, Tag,Popconfirm, Space ,Input,Button,notification} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import {FaRegAngry} from  'react-icons/fa';
const openNotificationsucces = (placement,message) => {
    notification.success({
      message,
      placement,
    });
  };
export default class GReclamation extends React.Component {
   constructor () {
    super();
  this.state = {
    searchText: '',
    searchedColumn: '',
    tableData: [{
                   Titre_reclamation:'',
                   Contenu:'',
                   date:'',
              }]
            }
          }

  /***************Liste des Reclamatiosn **********/
  componentDidMount() {
        axios.get('/reclamation/afficher')
            .then(res => {
                this.setState({ tableData: res.data });
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
          }
  /*****************Suppression d'une reclamation **********/
        
           deleteRow(_id,e){ 
             e.preventDefault();
          axios.delete(`/reclamation/supprimer/${_id}`)  
          .then(res => { 
             openNotificationsucces('bottomRight','Reclamation supprimée');
            console.log(res);  
            console.log(res.data);  
            const tableData = this.state.tableData.filter(item => item._id !== _id);  
            this.setState({ tableData });  
      }).catch((error) => {
                console.log(error.response)
            });
      
    }
  /**************Partie de Recherche*************** */
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

render(){

const { tableData } = this.state;
const columns = [
  {
    title: 'Titre',
    dataIndex: 'Titre_reclamation',
    accessor:'Titre_reclamation',
    key: 'Titre_reclamation',
    ...this.getColumnSearchProps('Titre_reclamation'),
  },
  {
    title: 'Contenu',
    dataIndex: 'Contenu',
    key: 'Contenu',
     ...this.getColumnSearchProps('Contenu'),
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'Date',
    ...this.getColumnSearchProps('Date'),
  },
  {
    title: 'Action',
    key: 'action',
     render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
            <ul>
            <Popconfirm title="Supprimer cette Réclamation?" onConfirm={(e) => this.deleteRow(record._id, e)}>
            <li> <a>Supprimer Réclamation</a></li> 
            </Popconfirm> <br/>

          {/* <Popconfirm title="êtes-vous sûr de vouloir rendre Cet Utilisateur un Expert?" onConfirm={(e) => this.AddExpert(record._id, e)} >
            <li> <a>bloquer abonné</a></li>
          </Popconfirm> */}
          </ul>
           </>
          ) : null,
  },
];


  return (
    <>
    <Sidebar/>
    <div >
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px"  }}
            startDelay={100}
            cursorColor="black"
            text="Traitement des Réclamations"
            typeSpeed={100}
          />
               <FaRegAngry style={{fontSize:"40px",marginLeft:"620px" ,color:"#e60000"}} />
      </div>
      <Table  style={{marginTop:"25px" }}columns={columns} dataSource={tableData} />
    <Footer/>
    </>
  );
    }
   }