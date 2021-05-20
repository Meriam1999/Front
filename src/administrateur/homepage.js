import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined ,UserOutlined,ManOutlined,WomanOutlined,NumberOutlined  } from '@ant-design/icons';


function HomePage() {
  return (
    <>
    <Sidebar/>
    <div >
        
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center",fontWeight:"bold",marginTop:"20px"}}
            startDelay={100}
            cursorColor="black"
            text="Bienvenue Admin"
            typeSpeed={100}
          />
    </div>
    <center>
<div style={{width:"1000px",backgroundColor:"#f0f5f5",marginTop:"60px",marginBottom:"30px"}}>
    <div className="site-statistic-demo-card" style={{paddingTop:"30px",paddingBottom:"30px",marginLeft:"30px",marginRight:"20px"}}>
    <Row gutter={16} style={{paddingTop:"10px"}}>
      <Col span={12}>
        <Card>
          <Statistic
            title="Nombre d'utilisateurs"
            value={167}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Nombre d'Experts"
            value={1}
            valueStyle={{ color: '#3f8600' }}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
    </Row>
    <Row gutter={16}  style={{paddingTop:"10px"}}>
    <Col span={12}>
        <Card>
          <Statistic
            title="Sexe Masculin"
            value={99}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ManOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="Sexe Feminin"
            value={68}
            valueStyle={{ color: '#3f8600' }}
            prefix={<WomanOutlined />}
          />
        </Card>
      </Col>

    </Row>
    <Row gutter={16}  style={{paddingTop:"10px"}}>
    <Col span={12}>
        <Card>
          <Statistic
            title="age <= 25"
            value={100}
            valueStyle={{ color: '#3f8600' }}
            prefix={<NumberOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card>
          <Statistic
            title="age >25"
            value={67}
            valueStyle={{ color: '#3f8600' }}
            prefix={<NumberOutlined />}
          />
        </Card>
      </Col>

    </Row>
  </div>
 
  </div>
  </center>
    <Footer/>
    </>
  );
}

export default HomePage;