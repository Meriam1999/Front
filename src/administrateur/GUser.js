import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import './style.css';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space,Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    nom: 'John Brown',
    prenom: 'brown',
    identifiant: 'New York No. 1 Lake Park',
    genre:['Homme'],
    email:'',
    numéroTéléphone:'',
    Date_Inscription:'',
    Date_Naissance:'',
  },
  {
    key: '2',
    nom: 'nada',
    prenom:'bouslama',
    identifiant: 'New York No. 1 Lake Park',
    genre:['Femme'],
    email:'nada@gmail.com',
    numéroTéléphone:98765432,
    Date_Inscription:'24/02/2020',
    Date_Naissance:'12/22/2333',
  },
  {
    key: '3',
    nom: 'Mariem',
    prenom:'souissi',
    identifiant: 'New York No. 1 Lake Park',
    genre:['Femme'],
    email:'mariem@gmail.com',
    numéroTéléphone:92110721,
    Date_Inscription:'03/05/1234',
    Date_Naissance:'03/05/1234',
  },
];

export default class Guser extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

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
   const columns = [
  {
    title: 'nom',
    dataIndex: 'nom',
    key: 'nom',
     ...this.getColumnSearchProps('nom'),
  },
  {
    title: 'prenom',
    dataIndex: 'prenom',
    key: 'prenom',
     ...this.getColumnSearchProps('prenom'),
  },
  {
    title: 'identifiant',
    dataIndex: 'identifiant',
    key: 'identifiant',
     ...this.getColumnSearchProps('identifiant'),

  },
  {
    title: 'Date_Naissance',
    dataIndex:'Date_Naissance',
    key:'Date_Naissance',
     ...this.getColumnSearchProps('Date_Naissance'),

  },
  {
    title: 'genre',
    dataIndex: 'genre',
    key: 'genre',
    ...this.getColumnSearchProps('genre'),
    render: genre => (
      <>
        {genre.map(tag => {
          let color="red";
          if (tag === 'Femme') {
            color = 'pink';
          }else {
              color ='blue'
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
    title: 'email',
    dataIndex: 'email',
    key: 'email',
     ...this.getColumnSearchProps('email'),
  },
  {
    title: 'numéroTéléphone',
    dataIndex: 'numéroTéléphone',
    key: 'numéroTéléphone',
     ...this.getColumnSearchProps('numéroTéléphone'),
  },
  {
    title: 'Date Inscription',
    dataIndex: 'Date_Inscription',
    key: 'Date_Inscription',
     ...this.getColumnSearchProps('Date_Inscription'),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Supprimer</a>
        <a>Modifier</a>
      </Space>
    ),
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
            text="Gestion Des Utilisateurs"
            typeSpeed={100}
          />
    <Table style={{marginTop:"25px"}} columns={columns} dataSource={data} />
    </div>
    <Footer/>
    </>
  );
  
  }
}


/*************************************************** */

