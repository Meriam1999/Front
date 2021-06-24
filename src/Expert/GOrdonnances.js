import React from 'react';
import '../App.css';
import './style.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { Table, Space, Input, Button, Tag, notification, Image } from 'antd';

import axios from 'axios';
import { Popconfirm } from 'antd';

const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};

export default class NestedTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    tableData: [{
      _id: '',
      contenu: '',
      expediteur: '',
      destinataire: '',
      Idannonce: '',
      approuved: ''
    }]
  }

  /**************Affichage des Annonces Autres *********/
  componentDidMount() {

    axios.get(`http://localhost:4000/formulaireOrdonnance/afficher`)
      .then(res => {
        this.setState({ tableData: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error.res);
      })
  }
  /****************Supprimer Annonce ************/
  Supprimerordonnance(_id, e) {
    e.preventDefault();
    //  const deletedRow= this.state.tableData.filter(item => item._id == _id)
    //  this.setState({ deletedRow });
    axios.delete(`http://localhost:4000/formulaireOrdonnance/delete/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Ordonnance supprimée');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item._id !== _id);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });
  }


  /********************Rejeter Annonce *******8*/
  ApprouverOrdonnance(_id, e, record) {
    e.preventDefault();
    const etat = {
      approuved: true
    }
    axios.put(`http://localhost:4000/formulaireOrdonnance/modifier/${_id}`, etat)
      .then(response => {
        console.log(response)
        window.location.reload();
      }
      ).catch(error => {
        console.error('There was an error!', error);
      });
  }

  /*******Supprimer tous ********/

  // handleResetall() {
  //   axios.delete('http://localhost:4000/nonMedicament/supprimer')
  //     .then(res => {
  //       openNotificationsucces('bottomRight', 'tous les Annonces sont supprimées');
  //       console.log(res);
  //       console.log(res.data);
  //       this.setState({ tableData: res.data });
  //       window.location.reload();
  //     }).catch((error) => {
  //       console.log(error.response)
  //     });
  // }

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
        title: 'Image ordonnance',
        dataIndex: 'contenu',
        accessor: 'contenu',
        width: 150,
        key: 'contenu',
        ...this.getColumnSearchProps('contenu'),
        render: (record) => (
          <>
            <Image src={`/assets/uploads/${record}`} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
          </>
        )
      },

      {
        title: 'Expediteur',
        dataIndex: 'expediteur',
        width: 250,
        accessor: 'expediteur',
        key: 'expediteur',
        ...this.getColumnSearchProps('expediteur'),
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
        title: 'Destinataire',
        accessor: 'destinataire',
        width: 100,
        dataIndex: 'destinataire',
        key: 'destinataire',
        ...this.getColumnSearchProps('destinataire'),
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
        title: 'Annonce',
        accessor: 'Idannonce',
        dataIndex: 'Idannonce',
        key: 'Idannonce',
        ...this.getColumnSearchProps('Idannonce'),
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
        title: 'Etat',
        accessor: 'approuved',
        dataIndex: 'approuved',
        key: 'approuved',
        ...this.getColumnSearchProps('approuved'),
        render: (record) => {
          if (record === false) {
            let color = "red";
            return (
              <Tag color={color}>
                Non Approuvée
              </Tag>
            );
          } else {
            let color = "cyan";
            return (
              <Tag color={color}>
                Approuvée
              </Tag>
            );
          }
        }

      },
      {
        title: 'Action',
        fixed: 'right',
        key: 'operation',
        render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
              <ul>
                <Popconfirm title="Approuver cette ordonnance?" onConfirm={(e) => this.ApprouverOrdonnance(record._id, e, record)} >
                  <li> <a>Approuver</a></li>
                </Popconfirm>
                {/* <Popconfirm title="Rejeter cette Annonce?" onConfirm={(e) => this.RejeterOr(record._id, e, record)} >
                  <li> <a>Rejeter</a></li>
                </Popconfirm> */}
                <Popconfirm title="Supprimer Cette ordonnance?" onConfirm={(e) => this.Supprimerordonnance(record._id, e)} >
                  <li> <a>Supprimer</a></li>
                </Popconfirm>
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
            text="Contrôle des ordonnances médicales"
            typeSpeed={100}
          />
          <Popconfirm title="Publier Cette Annonce?" onConfirm={this.handleResetall}>
            <Button style={{ marginLeft: "1100px", marginBottom: "20px" }}>Supprimer tous</Button>
          </Popconfirm>
          <Table
            style={{ width: "800px", marginLeft: "120px" }}
            columns={columns}
            dataSource={tableData}
          />
        </div>
        <Footer />
      </>
    );
  }
}
