import React from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, UserOutlined, ManOutlined, WomanOutlined, NumberOutlined } from '@ant-design/icons';
import axios from 'axios';
import { FaRegAngry, FaUserNurse, FaUserAlt } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      tableusers: [{
        _id: '',
        Nom: '',
        Prenom: '',
        Nom_utilisateur: '',
        Mot_de_passe: '',
        Photo_profile: '',
        Genre: [''],
        etat: [''],
        Email: '',
        Numero_telephone: ''

      }],
      tableexperts: [{
        _id: '',
        Nom: '',
        Prenom: '',
        Nom_utilisateur: '',
        Mot_de_passe: '',
        Photo_profile: '',
        Genre: [''],
        Email: '',
        etat: [''],
        job: [''],
        Numero_telephone: ''

      }],
      tableReclamations: [{
        _id: '',
        Titre_reclamation: '',
        Contenu: '',
        Date: ''
      }],
      tableCateg: [{
        _id: '',
        nom: '',
        description: '',
      }],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/user/afficher')
      .then(res => {
        this.setState({ tableusers: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get('/expert/afficher')
      .then(res => {
        this.setState({ tableexperts: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get('/reclamation/afficher')
      .then(res => {
        this.setState({ tableReclamations: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get('/categorie/afficher')
      .then(res => {
        this.setState({ tableCateg: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {

    const { Nb } = this.state;
    const nbMale = () => {
      let nb = 0;
      for (const [i, user] of this.state.tableusers.entries()) {
        if (user.Genre === 'Homme')
          nb++;
      }
      return nb;
    }

    return (
      <>
        <Sidebar />
        <div >

          <TypeWriterEffect
            textStyle={{ fontFamily: "sans-serif", textAlign: "center", fontWeight: "bold", marginTop: "20px" }}
            startDelay={100}
            cursorColor="black"
            text="Bienvenue Admin"
            typeSpeed={100}
          />
        </div>
        <center>
          <div style={{ width: "1000px", backgroundColor: "#f0f5f5", marginTop: "60px", marginBottom: "30px" }}>
            <div className="site-statistic-demo-card" style={{ paddingTop: "30px", paddingBottom: "30px", marginLeft: "30px", marginRight: "20px" }}>
              <Row gutter={16} style={{ paddingTop: "10px" }}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Nombre d'utilisateurs"
                      value={this.state.tableusers.length}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<FaUserAlt />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Nombre d'Experts"
                      value={this.state.tableexperts.length}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<FaUserNurse />}
                    />
                  </Card>
                </Col>
              </Row>
              <Row gutter={16} style={{ paddingTop: "10px" }}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Nombre de Reclamations"
                      value={this.state.tableReclamations.length}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<FaRegAngry />}
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Nombre de catégories"
                      value={this.state.tableCateg.length}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<FaWallet />}
                    />
                  </Card>
                </Col>

              </Row>

            </div>

          </div>
        </center>
        <Footer />
      </>
    );
  }
}