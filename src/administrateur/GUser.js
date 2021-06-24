import React, { useState } from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import './style.css';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space, Tag, Popconfirm, notification, Image } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { FaUserAlt } from 'react-icons/fa';

const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};

export default class Guser extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      searchedColumn: '',
      tableData: [{
        _id: '',
        Nom: '',
        Prenom: '',
        Nom_utilisateur: '',
        Mot_de_passe: '',
        Photo_profile: '',
        Genre: [''],
        etat: [''],
        Email: '',
        Numero_telephone: '',

      }],

    };

  }
  /*****************Recuperation des utilisateurs de la base de donnees**********/
  componentDidMount() {
    axios.get(`http://localhost:4000/user/afficher`)
      .then(res => {
        this.setState({ tableData: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  /*****************Suppression d'un utilisateur a partir de son ID **********/

  deleteRow(_id, e) {
    e.preventDefault();
    //  const deletedRow= this.state.tableData.filter(item => item._id == _id)
    //  this.setState({ deletedRow });
    axios.delete(`http://localhost:4000/user/supprimer/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Utilisateur supprimé');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item._id !== _id);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });

  }

  /**************Rendre un simple utilisateur un Expert *********** */

  AddExpert = (_id, record, e) => {
    e.preventDefault();
    const NExpert = record
    axios.delete(`http://localhost:4000/user/supprimer/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'expert Ajouté');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item._id !== _id);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });

    const NExpert1 = {
      dateInscription: NExpert.dateInscription,
      Nom: NExpert.Nom,
      Prenom: NExpert.Prenom,
      Nom_utilisateur: NExpert.Nom_utilisateur,
      Photo_profile: NExpert.Photo_profile,
      Mot_de_passe: NExpert.Mot_de_passe,
      Genre: NExpert.Genre,
      Email: NExpert.Email,
      etat: 'Expert',
      job: 'Pharmacien(ne)',
      Numero_telephone: NExpert.Numero_telephone,
    };
    axios.post(`http://localhost:4000/expert/ajouter`, NExpert1)
      .then(res => {
        console.log(res);
        console.log(res.data);

      }).catch((error) => {
        console.log(error.response)
      });
  }

  /************Rendre Admin ****************/
  AddAdmin = (_id, record, e) => {
    e.preventDefault();
    const User = record
    axios.delete(`http://localhost:4000/user/supprimer/${_id}`)
      .then(res => {
        openNotificationsucces('bottomRight', 'Admin Ajouté');
        console.log(res);
        console.log(res.data);
        const tableData = this.state.tableData.filter(item => item._id !== _id);
        this.setState({ tableData });
      }).catch((error) => {
        console.log(error.response)
      });

    const NAdmin = {

      dateInscription: User.dateInscription,
      Nom: User.Nom,
      Prenom: User.Prenom,
      Nom_utilisateur: User.Nom_utilisateur,
      Photo_profile: User.Photo_profile,
      Mot_de_passe: User.Mot_de_passe,
      Genre: User.Genre,
      Email: User.Email,
      etat: 'Administrateur',
      Numero_telephone: User.Numero_telephone,
    };
    axios.post(`http://localhost:4000/admin/ajouter`, NAdmin)
      .then(res => {
        console.log(res);
        console.log(res.data);

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

  /***********Partie modification des coordonness */


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
        title: "Nom Utilisateur",
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
              let color = "red";
              if (Etat === 'Femme') {
                color = 'pink';
              } else if (Etat === 'Homme') {
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
        title: 'Email',
        dataIndex: 'Email',
        accessor: 'Email',
        key: 'Email',
        ...this.getColumnSearchProps('Email'),
      },
      {
        title: 'Numero Tel',
        dataIndex: 'Numero_telephone',
        accessor: 'Numero_telephone',
        key: 'Numero_telephone',
        ...this.getColumnSearchProps('Numero_telephone'),
      },
      // {
      //   title: 'MDP',
      //   dataIndex: 'Mot_de_passe',
      //   accessor: 'Mot_de_passe',
      //   key: 'Mot_de_passe',
      //   ...this.getColumnSearchProps('Mot_de_passe'),
      // },
      {
        title: 'Date Inscription',
        dataIndex: 'dateInscription',
        accessor: 'dateInscription',
        key: 'dateInscription',
        ...this.getColumnSearchProps('dateInscription'),
      },
      // {
      //   title: 'MDP',
      //   dataIndex: 'MotDePasse',
      //   accessor: 'Mot_de_passe',
      //   key: 'MotDePasse',
      //   ...this.getColumnSearchProps('MotDePasse'),
      // },
      {
        title: 'Etat',
        dataIndex: 'etat',
        accessor: 'etat',
        key: 'etat',
        ...this.getColumnSearchProps('etat'),
        render: etat => (
          <>
            {etat.map(Etat => {
              let color = "red";
              if (Etat === 'Utilisateur') {
                color = 'blue';
              } else if (Etat === 'Expert') {
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
        title: 'Photo Profile',
        dataIndex: ' Photo_profile',
        accessor: 'Photo_profile',
        key: ' Photo_profile',
        ...this.getColumnSearchProps(' Photo_profile'),
        render: (record) => (
          <>
            <Image src='/assets/images/anonyme.jpg' alt="" style={{ width: "80px", height: "80px", borderRadius: "50%" }} />
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
                <Popconfirm title="êtes-vous sûr de vouloir supprimer cet Utilisateur?" onConfirm={(e) => this.deleteRow(record._id, e)}>
                  <li> <a>Supprimer</a></li>
                </Popconfirm> <br />

                <Popconfirm title="êtes-vous sûr de vouloir rendre Cet Utilisateur un Expert?" onConfirm={(e) => this.AddExpert(record._id, record, e)} >
                  <li> <a>Rendre Expert</a></li>
                </Popconfirm><br />


                <Popconfirm title="êtes-vous sûr de vouloir bloquer Cet Utilisateur?" >
                  {/* onConfirm={(e) => this.AddAdmin(record._id, record, e)} > */}
                  <li> <a>bloquer</a></li>
                </Popconfirm>
              </ul>
            </>
          ) : null,
      },
    ];

    return (
      <>
        <Sidebar />
        <div>
          <TypeWriterEffect
            textStyle={{ fontFamily: "sans-serif", textAlign: "center", fontWeight: "bold", marginTop: "25px" }}
            startDelay={100}
            cursorColor="black"
            text="Gestion Des Utilisateurs"
            typeSpeed={100}
          />
          <FaUserAlt style={{ fontSize: "40px", marginLeft: "620px", color: "#ff9933" }} />
          <Table style={{ marginTop: "25px" }} columns={columns} dataSource={tableData} />
        </div>
        <Footer />
      </>
    );

  }
}

/*************************************************** */

