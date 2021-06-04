import React,{useState} from 'react';
import '../App.css';
import UploadAvatar from '../components/uploadPic/AvatarUpload';
import TypeWriterEffect from 'react-typewriter-effect';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Badge, Card,DatePicker, Space,Modal,notification} from 'antd';
import moment from 'moment';
import {SettingTwoTone } from '@ant-design/icons';

const dateFormat = 'YYYY/MM/DD';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const { Option } = Select;
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};
const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: 'Suppression Compte VmedicTn',
    icon: <ExclamationCircleOutlined />,
    content: 'Est-ce Que vous êtes sure de vouloir Nous quittez?',
    onOk() {
       return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
function handleChange(value) {
  console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
}
const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 10,
    },
  },
};
const prefixSelector = (
  <Form.Item name="prefix" noStyle>
  <Select
   defaultValue="+216"
    style={{
      width: 100,
    }}
  >
    <Option value="+216">+216</Option>
    
  </Select>
  </Form.Item>
);
const openNotification = (placement,message) => {
    notification.info({
      message,
      placement,
    });
  };
 const info=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Vos Paramètres sont mis à jour</center></p>
            </div>
          ),
        });
      }
const ModifProfile=()=>{

  const [nom,setNom] = useState("");
  const [prènom,setprènom] = useState("");
  const [phone,setPhone] = useState("");
  const [Sexe,setSexe] = useState("");
  const [DateNaissance,setDateNaissance] = useState("");



 
  const validAnnonce =()=>{
    if(nom && prènom && phone && Sexe && DateNaissance){
      return  true
    }
    return false
  }
  const handleResetData2 =()=>{
  
  }
  const handleSubmit2 = (event) => {
   
  }

  
  const handleResetData =()=>{
   setNom("");
   setprènom("");
  setPhone("");
  setSexe("");
  setDateNaissance("");
    return true
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(validAnnonce()){
      info()
    }else{
      openNotification('bottomRight','Merci de Remplir Tous les Champs obligatoires!');
    }
  }



  return (
    <>
    <Sidebar/>
                 <TypeWriterEffect
                    textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px"  }}
                    startDelay={100}
                    cursorColor="black"
                    text="Mes paramètres"
                    typeSpeed={100}
                />  
            <SettingTwoTone twoToneColor="#52c41a" style={{fontSize:"40px",marginLeft:"620px"}} />


             <div style={{marginTop:"20px",marginLeft:"230px",marginBottom:"20px",fontWeight:"bold"}}>
            <Badge.Ribbon text="Paramètres Du Profil" placement="start">
               <Card  style={{width:"800px",backgroundColor:"#f2f2f2"}}>
                <div style={{marginTop:"30px"}}>
                  <Form  className="FormModifProfile" {...formItemLayout}>
                  <Form.Item
                  name="pictureprofile"
                  lable="Photo de profile">
                      {/* <UploadAvatar/> */}
                  </Form.Item>
                  <Form.Item
                name="nom"
                label="Votre Nom:"
                hasFeedback
                rules={[
                  {
                  required: true,
                  message: 'Veuillez Remplir ce champ !'
                
                },
                {
                  pattern: new RegExp(
                     /^[a-zA-Z\s]*$/
                  ),
                  message:'Veuillez Entrer que des Lettres SVP!',
                  }
                ]}
              >
                <Input maxLength="25" minLength="2" style={{marginLeft:"16px"}} />
              </Form.Item>
              <Form.Item
                hasFeedback
                name="prènom"
                label="Votre Prènom:"
                rules={[
                          {
                    required: true,
                    message: 'Veuillez Remplir ce champ !'
                  
                  },
                  {
                    pattern: new RegExp(
                       /^[a-zA-Z\s]*$/
                    ),
                    message:'Veuillez Entrer que des Lettres SVP!',
                    }
                ]}
              >
                <Input  maxLength="25" minLength="2" style={{marginLeft:"16px"}} />
              </Form.Item>

                  <Form.Item
                  name="phone"
                  label="Numero de Téléphone"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Veuillez saisir votre numero de Téléphone!',
                    },
                     {
                      pattern: new RegExp(/^[0-9\b]+$/),
                      message: 'Veuillez saisir que des chiffres SVP!',
                    },
                  
                  ]}
                >
                  <Input
                  onChange={(event)=>{
        setPhone(event.target.value)}}
                  maxLength='8'
                    addonBefore={prefixSelector}
                    style={{
                      width: '100%',
                    }}
                  />
                </Form.Item> 

                <Form.Item
                name="Sexe"
                label="Sexe">
                <Select
                labelInValue
                hasFeedback
                defaultValue={{ value: 'homme' }}
                style={{ width: "120px",marginLeft:"16px" }}
                onChange={setSexe}
              >
                <Option value="homme">homme</Option>
                <Option value="femme">femme</Option>
              </Select>
                </Form.Item>  

                <Form.Item
                name="DateNaissance"
                label="Date de Naissance">
                    <Space style={{marginLeft:"16px"}}  direction="vertical" size={12}>
                      <DatePicker onChange={(value)=>{
                  if(value){
                       const date = new Date(value["_d"]);
              setDateNaissance(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
                  }
               }} />
                    </Space>
                </Form.Item>
                <div style={{marginLeft:"240px",display:"inline-flex",flexDirection:"row"}}>
                  <Form.Item >
                  <Button type="primary" htmlType="submit" onClick={handleSubmit} style={{width:"150px"}}>
                    Enregistrer
                  </Button>
                </Form.Item>
                 <Form.Item >
                  <Button type="primary" htmlType="reset" onClick={handleResetData} style={{width:"150px"}}>
                    Annuler
                  </Button>
                </Form.Item>
                </div>

                 </Form>
                 </div>
              </Card>
             </Badge.Ribbon>
            </div>
             


<div style={{marginTop:"20px",marginLeft:"230px",marginBottom:"20px",fontWeight:"bold"}}>
            <Badge.Ribbon text="Paramètres Du Compte" placement="start">
    <Card  style={{width:"800px",backgroundColor:"#f2f2f2"}}>
            <div style={{marginTop:"30px"}}>
              <Form className="FormModifProfile2"
              {...formItemLayout}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
        <Form.Item
        name="username"
        label="identifiant"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'veuillez saisir votre identifiant SVP!',
            whitespace: true,
          },
        ]}
      >
        <Input style={{marginLeft:"16px"}} />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'veuillez saisir un E-mail valide ou il ya "@"!',
          },
          {
            required: true,
            message: 'veuillez saisir votre E-mail SVP !',
          },
        ]}
      >
        <Input style={{marginLeft:"16px"}} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mot de passe"
        rules={[
          {
            required: true,
            message: 'veuillez saisir votre mot de passe !',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmer mot de passe"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'confirmer votre mot de passe SVP !',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Les deux mots de passe que vous avez saisis ne correspondent pas!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div style={{marginLeft:"240px",display:"inline-flex",flexDirection:"row"}}>
                  <Form.Item >
                  <Button type="primary" htmlType="submit" onClick={handleSubmit2} style={{width:"150px"}}>
                    Enregistrer
                  </Button>
                </Form.Item>
                 <Form.Item >
                  <Button type="primary" htmlType="reset" onClick={handleResetData2} style={{width:"150px"}}>
                    Annuler
                  </Button>
                </Form.Item>
                </div>
       </Form>
         </div>
         </Card>
         </Badge.Ribbon>
         </div>

           <div style={{marginTop:"20px",marginLeft:"230px",marginBottom:"20px",fontWeight:"bold"}}>
            <Badge.Ribbon text="Suppression du Compte VmedicTn" placement="start">
              <Card  style={{width:"800px",backgroundColor:"#f2f2f2"}}>
               <div style={{marginTop:"30px"}}>
                  <Form  className="FormModifProfile" {...formItemLayout}>
                  <center><span> Voulez-Vous Supprimer Votre Compte VmedicTn ?</span></center>
                    <Form.Item>
                      <Button type="primary" style={{width:"300px",marginLeft:"230px",marginTop:"20px" , backgroundColor:"#ff9999" , borderColor:"#ff4d4d"}} onClick={showConfirm}> Supprimer Mon Compte </Button>
                      </Form.Item>
                   
                  </Form>
              </div>
              </Card>
             </Badge.Ribbon>
          </div>
    <Footer/>
    </>
  );
 }

export default ModifProfile