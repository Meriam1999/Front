import React from 'react';
import '../App.css';
import './style.css';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, CheckCircleTwoTone, CloseCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

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
      userId: '',
      Titre: '',
      Description: '',
      Gouvernorat: '',
      Ville: '',
      Etat1Anononce: [''],
      Etat2Anononce: [''],
      Prix: '',
      Photo_annonce: '',
      Date_Annonce: '',
      Catégorie: [''],
      TypeAnnonce: [''],
      TypeNonmedicament: [''],
      Produit: '',
      Tags: '',
      images: ['']
    }]
  }

  /**************Affichage des Annonces Autres *********/
  componentDidMount() {
    // console.log(Nm);
    const type = {
      TypeNonmedicament: ''
    }
    console.log(type)
    axios.get(`http://localhost:4000/nonMedicament/afficher`)
      .then(res => {
        this.setState({ tableData: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error.res);
      })
  }
  /****************Supprimer Annonce ************/
  SupprimerAnnonce(_id, e) {
    e.preventDefault();
    //  const deletedRow= this.state.tableData.filter(item => item._id == _id)
    //  this.setState({ deletedRow });
    axios.delete(`http://localhost:4000/nonMedicament/supprimer/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Annonce supprimée');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item._id !== _id);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });
  }


  /********************Rejeter Annonce *******8*/
  RejeterAnnonce(_id, e, record) {
    e.preventDefault();
    const nonMedic = {
      Etat1Anononce: ['Rejeté_Expert']
    }
    axios.put(`http://localhost:4000/nonMedicament/modifier/${_id}`, nonMedic)
      .then(response => {
        console.log(response)
        window.location.reload();
      }
      ).catch(error => {
        console.error('There was an error!', error);
      });
  }


  /********************Rejeter Annonce *******8*/
  ApprouverAnnonce(_id, e, record) {
    e.preventDefault();
    const nonMedic = {
      Etat1Anononce: ['Validé_Expert']
    }
    axios.put(`http://localhost:4000/nonMedicament/modifier/${_id}`, nonMedic)
      .then(response => {
        console.log(response)
        window.location.reload();
      }
      ).catch(error => {
        console.error('There was an error!', error);
      });
  }
  /*******Supprimer tous ********/

  handleResetall() {
    axios.delete('http://localhost:4000/nonMedicament/supprimer')
      .then(res => {
        openNotificationsucces('bottomRight', 'tous les Annonces sont supprimées');
        console.log(res);
        console.log(res.data);
        this.setState({ tableData: res.data });
        window.location.reload();
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
        title: 'Titre',
        dataIndex: 'Titre',
        accessor: 'Titre',
        width: 120,
        key: 'Titre',
        ...this.getColumnSearchProps('Titre'),
        fixed: 'left',
      },

      {
        title: 'Description',
        dataIndex: 'Description',
        width: 250,
        accessor: 'Description',
        key: 'Description',
        ...this.getColumnSearchProps('Description'),
      },

      {
        title: 'Date Annonce',
        accessor: 'Date_Annonce',
        width: 100,
        dataIndex: 'Date_Annonce',
        key: 'Date_Annonce',
        ...this.getColumnSearchProps('Date_Annonce'),
      },
      {
        title: 'Gouvernorat',
        dataIndex: 'Gouvernorat',
        width: 120,
        accessor: 'Gouvernorat',
        key: 'Gouvernorat',
        ...this.getColumnSearchProps('Gouvernorat'),
      },

      {
        title: 'Ville',
        accessor: 'Ville',
        dataIndex: 'Ville',
        key: 'Ville',
        ...this.getColumnSearchProps('Ville'),
      },

      // {
      //   title: 'Tags',
      //   dataIndex: 'Tags',
      //   accessor: 'tableData.Tags',
      //   key: 'Tags',
      //   ...this.getColumnSearchProps('Tags'),
      // },
      {
        title: 'Prix',
        dataIndex: 'Prix',
        accessor: 'Prix',
        key: 'Prix',
        ...this.getColumnSearchProps('Prix'),
      },
      {
        title: 'Type Annonce',
        dataIndex: 'TypeAnnonce',
        width: 360,
        accessor: 'TypeAnnonce',
        key: 'TypeAnnonce',
        ...this.getColumnSearchProps('TypeAnnonce'),
        render: TypeAnnonce => (
          <>
            {TypeAnnonce.map(Etat => {
              let color = "blue";
              if (Etat === "Annonce d'offre gratuit /Vente(Prix Symbolique)") {
                color = 'green';
              } else {
                color = 'cyan'
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
        title: 'images',
        dataIndex: 'images',
        accessor: 'tableData.images',
        key: 'images',
        ...this.getColumnSearchProps('images'),
        render: images => (
          <>
            {images.map(imag => {
              return (
                <Image src={`/assets/uploads/${imag}`} alt="" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
              );
            })}
          </>
        ),
      },
      {
        title: 'Etat1',
        dataIndex: 'Etat1Anononce',
        accessor: 'Etat1Anononce',
        width: 140,
        key: 'Etat1Anononce',
        ...this.getColumnSearchProps('Etat1Anononce'),
        render: Etat1Anononce => (
          <>
            {Etat1Anononce.map(Etat => {
              let color = "blue";
              if (Etat === 'En_attente_Expert') {
                color = 'orange';
              } else if (Etat === 'Validé_Expert') {
                color = 'green';
              }
              else {
                color = 'red'
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
        title: 'Etat2',
        dataIndex: 'Etat2Anononce',
        accessor: 'Etat2Anononce',
        key: 'Etat2Anononce',
        ...this.getColumnSearchProps('Etat2Anononce'),
        render: Etat2Anononce => (
          <>
            {Etat2Anononce.map(Etat => {
              let color = "blue";
              if (Etat === 'irrésolu' || Etat === 'Disponible') {
                color = 'red';
              } else {
                color = 'green'
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
        title: 'Action',
        fixed: 'right',
        key: 'operation',
        render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
              <ul>
                <Popconfirm title="Publier Cette Annonce?" onConfirm={(e) => this.ApprouverAnnonce(record._id, e, record)} >
                  <li> <a>Publier</a></li>
                </Popconfirm>
                <Popconfirm title="Rejeter cette Annonce?" onConfirm={(e) => this.RejeterAnnonce(record._id, e, record)} >
                  <li> <a>Rejeter</a></li>
                </Popconfirm>
                <Popconfirm title="Supprimer Cette Annonce?" onConfirm={(e) => this.SupprimerAnnonce(record._id, e)} >
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
            text="Gestion Des Annonces Non Medicament"
            typeSpeed={100}
          />
          <Popconfirm title="Publier Cette Annonce?" onConfirm={this.handleResetall}>
            <Button style={{ marginLeft: "1100px", marginBottom: "20px" }}>Supprimer tous</Button>
          </Popconfirm>
          <Table
            scroll={{ x: 1700, y: 500 }}
            columns={columns}
            dataSource={tableData}
          />
        </div>
        <Footer />
      </>
    );
  }
}
