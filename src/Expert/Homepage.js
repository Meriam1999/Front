import React from 'react';
import '../App.css';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Expert';
import TypeWriterEffect from 'react-typewriter-effect';
import { Statistic, Card, Row, Col } from 'antd';
import { BarChartOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import axios from "axios"

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [{
        _id: '',
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
        TypeNonmedicament: '',
        Tags: '',
        Image: ''
      }]
    }
  }
  componentDidMount() {
    axios.get('http://localhost:4000/annonce/afficher')
      .then(res => {
        this.setState({ tableData: res.data });
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    return (
      <>
        <Sidebar />
        <div>

          <TypeWriterEffect
            textStyle={{ fontFamily: "sans-serif", textAlign: "center", fontWeight: "bold", marginTop: "20px" }}
            startDelay={100}
            cursorColor="black"
            text="Bienvenue Expert"
            typeSpeed={100}
          />

          <center>
            <div style={{ width: "1000px", backgroundColor: "#f0f5f5", marginTop: "60px", marginBottom: "30px" }}>
              <div className="site-statistic-demo-card" style={{ paddingTop: "30px", paddingBottom: "30px", marginLeft: "30px", marginRight: "20px" }}>
                <Row gutter={16} style={{ paddingTop: "10px" }}>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'annonces Total :"
                        value={this.state.tableData.length}
                        valueStyle={{ color: 'orange' }}
                        prefix={<BarChartOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'ordonnances Total"
                        value={0}
                        valueStyle={{ color: 'orange' }}
                        prefix={<BarChartOutlined />}
                      />

                    </Card>
                  </Col>
                </Row>
                <Row gutter={16} style={{ paddingTop: "10px" }}>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'annonces de Protection"
                        value={3}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<MedicineBoxOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'annonces de Protection"
                        value={0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<MedicineBoxOutlined />}
                      />
                    </Card>
                  </Col>

                </Row>
                <Row gutter={16} style={{ paddingTop: "10px" }}>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'annonces de Soin et Pansement"
                        value={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<MedicineBoxOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'annonces d'Autres "
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<MedicineBoxOutlined />}
                      />
                    </Card>
                  </Col>

                </Row>
                <Row gutter={16} style={{ paddingTop: "10px" }}>
                  <Col span={12}>
                    <Card>
                      <Statistic
                        title="Nombre d'annonces de Medicaments"
                        value={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<MedicineBoxOutlined />}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>

            </div>
          </center>
        </div>
        <Footer />
      </>
    );
  }
}

