import React from 'react';
import '../App.css';
import './style.css';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { Table, Space, Input, Button, Tag, notification } from 'antd';

import axios from 'axios';
import { Popconfirm } from 'antd';

const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};

export default class Medicament extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    tableData: [{
      _id: '',
      Titre: '',
      Description: '',
      Gouvernorat: '',
      Dosage: '',
      DateFabrication: '',
      DateExpiration: '',
      FormulaireOrdonnance: '',

      Ville: '',
      Etat1Anononce: [''],
      Etat2Anononce: [''],
      Prix: '',
      Photo_annonce: '',
      Date_Annonce: '',
      Catégorie: [''],
      TypeAnnonce: [''],
      TypeNonmedicament: [''],
      Tags: '',
      Image: ''
    }]
  }

  /**************Affichage des Annonces Autres *********/

  componentDidMount() {
    axios.get('/medicament/afficher')
      .then(res => {
        this.setState({ tableData: res.data });
        console.log("voila la liste des annonces");
        console.log(res.data)
      })
      .catch(function (error) {
        console.log("je ne peux pas afficher la liste des annonces");
        console.log(error);
        console.log(error.res);
      })
  }
  /****************Supprimer Annonce ************/
  SupprimerAnnonce(_id, e) {
    e.preventDefault();
    //  const deletedRow= this.state.tableData.filter(item => item._id == _id)
    //  this.setState({ deletedRow });
    axios.delete(`/medicament/supprimer/${_id}`)
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

  /*******Supprimer tous ********/

  handleResetall() {
    axios.delete('/nonMedicament/supprimer')
      .then(res => {
        openNotificationsucces('bottomRight', 'tous les Annonces sont supprimées');
        console.log(res);
        console.log(res.data);
        this.setState({ tableData: res.data });
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

    const expandedRowRender = () => {
      const columns = [
        {
          title: 'Gouvernorat',
          dataIndex: 'Gouvernorat',
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
        // {
        //   title: 'Images',
        //   dataIndex: 'Images',
        //   accessor: 'tableData.Images',
        //   key: 'Images',
        //   ...this.getColumnSearchProps('Images'),
        // },
        {
          title: 'Type',
          dataIndex: 'Type_annonce',
          accessor: 'TypeNonmedicament',
          key: 'Type_annonce',
          ...this.getColumnSearchProps('Type_annonce'),
          //      render:Type_annonce => (
          //   <>
          //     {Type_annonce.map(Etat => {
          //       let color="blue";
          //       if (Etat === "Annonce d'offre gratuit /Vente(Prix Symbolique)" ){
          //         color = 'green';
          //       }else {
          //           color ='lime'
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
        // {
        //   title: 'Photo',
        //   dataIndex: 'Photo_annonce',
        //   accessor: 'tableData.Photo_annonce',
        //   key: 'Photo_annonce',
        //   ...this.getColumnSearchProps('Photo_annonce'),
        // },

      ];

      return <Table columns={columns} dataSource={tableData} pagination={false} />;
    };
    const columns = [
      {
        title: 'Titre',
        dataIndex: 'Titre',
        accessor: 'Titre',
        key: 'Titre',
        ...this.getColumnSearchProps('Titre'),
      },

      // { title: 'Description',
      //  dataIndex: 'Produit',
      //  accessor:'tableData.Produit',
      //   key: 'Produit' ,
      //    ...this.getColumnSearchProps('Produit'),
      // },

      {
        title: 'Description',
        dataIndex: 'Description',
        accessor: 'Description',
        key: 'Description',
        ...this.getColumnSearchProps('Description'),
      },



      {
        title: 'Date Annonce',
        accessor: 'Date_Annonce',
        dataIndex: 'Date_Annonce',
        key: 'Date_Annonce',
        ...this.getColumnSearchProps('Date_Annonce'),
      },
      {
        title: 'Etat1',
        dataIndex: 'Etat1Anononce',
        accessor: 'Etat1Anononce',
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
        key: 'operation',
        render: (record) =>
          this.state.tableData.length >= 1 ? (
            <>
              <ul>
                <Popconfirm title="Publier Cette Annonce?" >
                  <li> <a>Publier</a></li>
                </Popconfirm>
                <Popconfirm title="Rejeter cette Annonce?"  >
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
            text="Gestion Des Annonces de Medicament"
            typeSpeed={100}
          />
          <Popconfirm title="Publier Cette Annonce?" onConfirm={this.handleResetall}>
            <Button style={{ marginLeft: "1100px", marginBottom: "20px" }}>Supprimer tous</Button>
          </Popconfirm>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={tableData}
          />
        </div>
        <Footer />
      </>
    );
  }
}
