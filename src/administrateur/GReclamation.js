import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Table, Tag, Popconfirm, Space, Input, Button, notification } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { FaRegAngry } from 'react-icons/fa';
const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};
export default class GReclamation extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      searchedColumn: '',
      tableData: [{
        Expediteur: '',
        IdExpediteur: '',
        idAnnonce: '',
        Titre_reclamation: '',
        Contenu: '',
        date: '',
      }],
      tableDataUser: [{
        Expediteur: '',
        IdExpediteur: '',
        AbbonneeReclamee: '',
        IdAbbonneeReclamee: '',
        Contenu: '',
        date: '',
      }]
    }
  }

  /***************Liste des Reclamatiosn **********/
  componentDidMount() {
    axios.get(`http://localhost:4000/reclamation/afficher`)
      .then(res => {
        this.setState({ tableData: res.data });
        this.setState({ tableDataUser: res.data })
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  /*****************Suppression d'une reclamation **********/

  deleteannonce(idAnnonce, e) {
    e.preventDefault();
    axios.delete(`http://localhost:4000/annonce/supprimer/${idAnnonce}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Reclamation supprimée');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item.idAnnonce !== idAnnonce);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });

  }
  deleteRow(_id, e) {
    e.preventDefault();
    axios.delete(`http://localhost:4000/reclamation/supprimer/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Reclamation supprimée');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item._id !== _id);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });

  }
  deleteRow1(_id, e) {
    e.preventDefault();
    axios.delete(`http://localhost:4000/reclamation/supprimer/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Reclamation supprimée');
        console.log(res);
        console.log(res.data);
        const tableDataUser = this.state.tableDataUser.filter(item => item._id !== _id);
        this.setState({ tableDataUser });
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

  render() {

    const { tableData } = this.state;
    const { tableDataUser } = this.state;
    const column2 = [

      {
        title: 'Contenu',
        dataIndex: 'Contenu',
        accessor: 'tableDataUser.Contenu',
        key: 'Contenu',
        ...this.getColumnSearchProps('Contenu'),
      },
      {
        title: 'Id Abbonee reclamee',
        dataIndex: 'idExp',
        accessor: 'tableDataUser.IdAbbonneeReclamee',
        key: 'idExp',
        ...this.getColumnSearchProps('idExp'),
        render: (record) => {
          return (
            <Link to={{
              pathname: `/profile/${record}`
            }}>
              {record}
            </Link>
          );
        }
      },
      {
        title: 'Id Expediteur',
        dataIndex: 'IdExpediteur',
        accessor: 'tableDataUser.IdExpediteur',
        key: 'IdExpediteur',
        ...this.getColumnSearchProps('IdExpediteur'),
        render: (record) => {
          return (
            <Link to={{
              pathname: `/profile/${record}`
            }}>
              {record}
            </Link>
          );
        }
      },

      {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
        accessor: 'tableData.Date',
        ...this.getColumnSearchProps('Date'),
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
              <ul>
                <Popconfirm title="Supprimer cette Réclamation?" onConfirm={(e) => this.deleteannonce1(record.idAnnonce, e)}>
                  <li> <a>Supprimer abonnee </a></li>
                </Popconfirm> <br />

                <Popconfirm title="Supprimer cette Réclamation?" onConfirm={(e) => this.deleteRow1(record._id, e)}>
                  <li> <a>Supprimer Réclamation</a></li>
                </Popconfirm> <br />

              </ul>
            </>
          ) : null,
      },
    ];
    const columns = [

      {
        title: 'Contenu',
        dataIndex: 'Contenu',
        accessor: 'tableData.Contenu',
        key: 'Contenu',
        ...this.getColumnSearchProps('Contenu'),
      },
      {
        title: 'Id annonce',
        dataIndex: 'idAnnonce',
        accessor: 'tableData.idAnnonce',
        key: 'idAnnonce',
        ...this.getColumnSearchProps('idAnnonce'),
        render: (record) => {
          return (
            <Link to={{
              pathname: `/annonce/${record}`
            }}>
              {record}
            </Link>
          );
        }
      },
      {
        title: 'Id Expediteur',
        dataIndex: 'IdExpediteur',
        accessor: 'tableData.IdExpediteur',
        key: 'IdExpediteur',
        ...this.getColumnSearchProps('IdExpediteur'),
        render: (record) => {
          return (
            <Link to={{
              pathname: `/profile/${record}`
            }}>
              {record}
            </Link>
          );
        }
      },

      {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
        accessor: 'tableData.Date',
        ...this.getColumnSearchProps('Date'),
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
              <ul>
                <Popconfirm title="Supprimer cette Réclamation?" onConfirm={(e) => this.deleteannonce(record.idAnnonce, e)}>
                  <li> <a>Supprimer Annonce</a></li>
                </Popconfirm> <br />

                <Popconfirm title="Supprimer cette Réclamation?" onConfirm={(e) => this.deleteRow(record._id, e)}>
                  <li> <a>Supprimer Réclamation</a></li>
                </Popconfirm> <br />

              </ul>
            </>
          ) : null,
      },
    ];


    return (
      <>
        <Sidebar />
        <div >
          <TypeWriterEffect
            textStyle={{ fontFamily: "sans-serif", textAlign: "center", fontWeight: "bold", marginTop: "25px" }}
            startDelay={100}
            cursorColor="black"
            text="Traitement des Réclamations"
            typeSpeed={100}
          />
          <FaRegAngry style={{ fontSize: "40px", marginLeft: "620px", color: "#e60000" }} />
          <center>    <h1>Reclamations Annonces</h1></center>
        </div>
        <Table style={{ marginTop: "25px", width: "1050px", marginLeft: "12%" }} scroll={{ y: 500 }} columns={columns} dataSource={tableData} />
        <div>
          <center>    <h1>Reclamations Abbonees </h1></center>
        </div>
        <Table style={{ marginTop: "25px", width: "1050px", marginLeft: "12%" }} scroll={{ y: 500 }} columns={column2} dataSource={tableDataUser} />
        <Footer />
      </>
    );
  }
}