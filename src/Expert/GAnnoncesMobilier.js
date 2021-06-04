import React from 'react';
import '../App.css';
import './style.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Table, Input,Tag, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';



export default class GAnnoncesMobilier extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    tableData: [{
                      _id:'',
                      Titre:'',
                      Description:'',
                      Gouvernorat:'',
                      Ville:'',
                      Etat1Anononce:[''],
                      Etat2Anononce:[''],
                      Prix:'',
                      Photo_annonce:'',
                      Date_Annonce:'',
                      TypeAnnonce:[''],
                      Tags:[{
                        _id:'',
                        Contenu:['']
                      }],
                      Image:[{
                         _id:'',
                        CodeBase64:''
                      }],
                }],
  };


  /*********************Recherche****************** */
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
    const { Annonce }= this.state;

   const columns = [
 
 {
    title: 'Titre',
    dataIndex: 'Titre',
    key: 'Titre',
    ...this.getColumnSearchProps('Titre'),
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    key: 'Description',
    ...this.getColumnSearchProps('Description'),
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
    ...this.getColumnSearchProps('type'),
  },
  // {
  //   title: 'Gouvernorat',
  //   dataIndex: 'Gouvernorat',
  //   key: 'Gouvernorat',
  //   ...this.getColumnSearchProps('Gouvernorat'),
  // },
  //  {
  //   title: 'Ville',
  //   dataIndex: 'Ville',
  //   key: 'Ville',
  //   ...this.getColumnSearchProps('Ville'),
  // },
   {
    title: 'DateAnnonce',
    dataIndex: 'DateAnnonce',
    key: 'DateAnnonce',
    ...this.getColumnSearchProps('DateAnnonce'),
  },
   {
    title: 'Prix',
    dataIndex: 'Prix',
    key: 'Prix',
    ...this.getColumnSearchProps('Prix'),
  },
  {
   title: 'imageDefaut',
    dataIndex: 'imageDefaut',
    key: 'imageDefaut',
    ...this.getColumnSearchProps('imageDefaut'),
  },
  {
   title: 'images',
    dataIndex: 'images',
    key: 'images',
    ...this.getColumnSearchProps('images'),
  },
   {
    title: 'Etat',
    key: 'Etat',
    dataIndex: 'Etat',
    ...this.getColumnSearchProps('Etat'),
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
    ),
    
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
  },]

 return (
    <>
    <Sidebar/>
    <div >
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px" }}
            startDelay={100}
            cursorColor="black"
            text="Gestion Des Annonces Mobilier Medicales"
            typeSpeed={100}
          />
    <Table  style={{marginTop:"25px",width:"100%" }}columns={columns} dataSource={Annonce} />
    </div>
    <Footer/>
    </>
  );
  }
}



