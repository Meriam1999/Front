import React,{useState} from 'react';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';
import PicturesWall from '../uploadPic/Uploadpic';
import Tags from './Tags/Tagsmedicaments';
import Tags2 from './Tags/TagsmobilierMedicale';
import Tags3 from'./Tags/TagsProtection';
import Tags4 from './Tags/TagsSoin';
import Tags5 from './Tags/TagsAutre';
import moment from 'moment';
import {
  Form,
  Modal,
  Select,
  DatePicker,
  Space ,
  Input,
  Radio,
  Button,
  InputNumber,
  notification,
  Popover
} from 'antd';

import "./pubAnnonce.css";

/**************components pour le design ***************/

  
  /***Model Notifcation ***/
      const info=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Votre publication a été envoyée et est en attente d’approbation par un administrateur.</center></p>
            </div>
          ),
          onOk(){<Redirect to="/" />},
        });
      }

/***Fonctions pour design****/
      function onChange1(value) {
        console.log('changed', value);
      }

      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

      const { Option } = Select;
      const formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 17,
        },
      };

      const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
          return e;
        }

        return e && e.fileList;
      };

    
/*************Notre classe ***********/
export default function Annonce() {
  /*
  ******************************************
   *                    States             /
   * ****************************************
   */
  const [titre,setTitre] = useState("");
  const [categorie,setCategorie] = useState("");
  const [dateFabrication,setDateFabrication] = useState("");
  const [dateExpiration,setDateExpiration] = useState("");
  const [Dosage,setDosage] = useState("");
  const [Gouvernorat,setGouvernorat] = useState("");
  const [Ville,setVille] = useState("");
  const [mode,setMode] = useState("");
  const [images,setimages] = useState("");
 /*
  constructor(props) {
    super(props);
    this.state = {
      Titre: null,
      Description: null,
      Description: null,
      DateFabrication:null,
      DateExpiration:null,
      Dosage:null,
      Gouvernorat:null,
      Ville:null,
      mode:null,
      image: null,
      errors: {
        Titre: '',
       Description: '',
       Catégorie: '',
       DateFabrication: '',
       DateExpiration:'',
       Dosage:'',
       Gouvernorat: '',
        Ville: '',
        mode: '',
       image: '',
      }
    };
  }
*/
 /*
  ******************************************
   *                  Functions            /
   * ***************************************
   */

  const openNotification = (placement,message) => {
    notification.info({
      message,
      placement,
    });
  };

  const validAnnonce =()=>{
    if(titre && categorie && Gouvernorat && Ville && mode){
      return  (categorie !=="Médicament" || dateExpiration && dateFabrication && Dosage)

    }
    return false
  }
  
  
  const handleResetData =()=>{
   setTitre("");
   setCategorie("");
  setDosage("");
  setGouvernorat("");
  setMode("");
  setVille("");
  setimages("");
    return true
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(validAnnonce()){
      info();

    }else{
      openNotification('bottomRight','Merci de Remplir Tous les Champs obligatoires!');

    }
  }



  return (
    <div style={{paddingTop:"15px",marginBottom:"20px"}} className="pubAnnonce" id="pubAnnonce">

    <Form 
      style={{marginRight:"140px",fontWeight:"bold"}}
      name="validate_other"
      {...formItemLayout}
    >
          <Form.Item 
           style={{width:"460px"}}
        name={['produit', 'titre']}
        label="Titre"
        hasFeedback
        rules={[
          {
            required: true,
            message:'Veuillez Remplir ce champ !',
          },
        ]}
      >
        <Input maxLength="50"  style={{width:"300px",marginLeft:"73px"}} onChange={(event)=>{
        setTitre(event.target.value)
        }} />
      </Form.Item>

      <Form.Item name='Description' label="Déscription" style={{width:"465px",marginLeft:"80px"}}>
        <Input.TextArea maxLength="800" style={{width:"360px",marginLeft:"35px"}} 
       />
      </Form.Item>

      <Form.Item
      style={{width:"455px",marginLeft:"60px"}}
        name="Catégorie"
        label="Catégorie"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez Remplir ce champ !',
          },
        ]}
      >
        <Select placeholder="Selectionnez la Catégorie" value={categorie}	 style={{width :"300px",marginLeft:"43px"}} onChange={setCategorie}>
          <Option  value="Médicament">Médicament</Option>
          <Option value="Mobilier Médicale">Mobilier Médicale</Option>
          <Option value="Protection">Protection</Option>
          <Option value='Soin et Pansements'>Soin et Pansements</Option>
          <Option value='Autre'>Autre </Option>
        </Select>
    </Form.Item>
    
    <Form.Item
          style={{marginLeft:"340px",marginTop:"2px",marginBottom:"0px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.Catégorie!== currentValues.Catégorie}
        >
          {({ getFieldValue }) =>
            getFieldValue('Catégorie') === 'Médicament' ? (
              <Form.Item   style={{marginTop:"0px",marginBottom:"0px"}}  >
                <center>
              <Form.Item 
                name="dateFabrication"
                label="date F"
                rules={[
                  {
                    required: true,
                    message:"la date de fabrication est obligatoire !",
                  },
                ]}
              >
               <Space direction="vertical" >
               <DatePicker  onChange={(value)=>{
                  if(value){
                       const date = new Date(value["_d"]);
              setDateFabrication(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
                  }
               }}/>
               </Space>
              </Form.Item>
              </center>
              <center>
              <Form.Item 
                name="dateExpiration"
                label="date E"
                rules={[
                  {
                    required: true,
                    message:"la date d'expiration est obligatoire !",
                  },
                ]}
              >
               <Space direction="vertical" >
               <DatePicker onChange={(value)=>{
             if(value){
                   const date = new Date(value["_d"]);
              setDateExpiration(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`);
             }
               }}/>
               </Space>
              </Form.Item>
              </center>
              <Form.Item  
                name="Dosage"
                label="Dosage"
                rules={[
                  {
                    required: true,
                    message:'Veuillez Remplir ce champ !',
                  },
                ]}
              >
               <Input maxLength="20" placeholder="en mg,ml,nombre de comprimés ..." style={{fontWeight:"bold",width:"300px"}} onChange={(event)=>{
               setDosage(event.target.value)}} />
              </Form.Item>
              <Form.Item
                name="Tags"
                label="tags"
                style={{marginLeft:"20px",width:"500px",marginBottom:"-55px"}}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
               <Tags />
              </Form.Item>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
        style={{marginLeft:"410px",marginTop:"1px",marginBottom:"2px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.Catégorie !== currentValues.Catégorie}
        >
          {({ getFieldValue }) =>
            getFieldValue('Catégorie') === 'Mobilier Médicale' ? (
              <Form.Item
                name="Tags2"
                label="tags"
                style={{marginLeft:"-60px",width:"500px",marginBottom:"-40px",marginTop:"-20px"}}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
             <Tags2 />
              </Form.Item>
              
            ) : null
          }
        </Form.Item>
       <Form.Item
        style={{marginLeft:"410px",marginTop:"1px",marginBottom:"2px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.Catégorie !== currentValues.Catégorie}
        >
          {({ getFieldValue }) =>
            getFieldValue('Catégorie') === 'Protection' ? (
              <Form.Item
                name="Tags3"
                label="tags"
                 style={{marginLeft:"-60px",width:"500px",marginBottom:"-40px",marginTop:"-55px"}}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
             <Tags3 />
              </Form.Item>
              
            ) : null
          }
        </Form.Item>
      <Form.Item
        style={{marginLeft:"410px",marginTop:"1px",marginBottom:"2px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.Catégorie !== currentValues.Catégorie}
        >
          {({ getFieldValue }) =>
            getFieldValue('Catégorie') === 'Soin et Pansements' ? (
              <Form.Item
                name="Tags4"
                label="tags"
                 style={{marginLeft:"-60px",width:"500px",marginBottom:"-40px",marginTop:"-85px"}}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
             <Tags4/>
              </Form.Item>
              
            ) : null
          }
        </Form.Item>
         <Form.Item
        style={{marginLeft:"410px",marginTop:"1px",marginBottom:"2px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.Catégorie !== currentValues.Catégorie}
        >
          {({ getFieldValue }) =>
            getFieldValue('Catégorie') === 'Autre' ? (
              <Form.Item
                name="Tags5"
                label="tags"
                 style={{marginLeft:"-60px",width:"500px",marginBottom:"-90px",marginTop:"-120px"}}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
             <Tags5/>
              </Form.Item>
              
            ) : null
          }
        </Form.Item>
      <Form.Item
      style={{width:"364px",marginLeft:"30px",marginTop:"-75px"}}
        name="select"
        label="Gouvernorat :"
        hasFeedback
        rules={[
          {
            required: true,
            message:'Veuillez Remplir ce champ !',
          },
        ]}
      >
        <Select style={{width:"300px",marginLeft:"35px",marginTop:"-30px"}} placeholder="Selectionnez votre gouvernorat" onChange={setGouvernorat}>
          <Option value="Ariana">Ariana</Option>
          <Option value="Beja">Béja</Option>
          <Option value="Ben Arous">Ben Arous</Option>
          <Option value="Bizerte">Bizerte</Option>
          <Option value="Gabes">Gabes</Option>
          <Option value="Gafsa">Gafsa</Option>
          <Option value="Jendouba">Jendouba</Option>
          <Option value="Kairouan">Kairouan</Option>
          <Option value="Kebili">Kébili</Option>
          <Option value="Kasserine">Kasserine</Option>
          <Option value="La Manouba">La Manouba</Option>
          <Option value="le Kef ">le Kef</Option>
          <Option value="Mahdia">Mahdia</Option>
          <Option value="Medenine">Medenine</Option>
          <Option value="Monatsir">Monatsir</Option>
          <Option value="Nabeul">Nabeul</Option>
          <Option value="Sfax">Sfax</Option>
          <Option value="Sidi Bouzid">Sidi Bouzid</Option>
          <Option value="Siliana">Siliana</Option>
          <Option value="Sousse">Sousse</Option>
          <Option value="Tataouine">Tataouine</Option>
          <Option value="Tozeur">Tozeur</Option>
          <Option value="Tunis">Tunis</Option>
          <Option value="Zaghouan">Zaghouan</Option>
        </Select>
      </Form.Item>

      <Form.Item hasFeedback  name="Ville" label="Ville:" style={{width:"455px",marginLeft:"0px"}} rules={[
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
        ]}>
        <Input type="text"maxLength="30"style={{width:"300px",marginLeft:"72px", fontWeight:"bold"}} placeholder="Saisir votre Ville " onChange={(event)=>{
          setVille(event.target.value)
        }} />
      
      </Form.Item>

      <Form.Item style={{width:"600px",marginLeft:"94px"}} rules={[
          {
            required: true,
            message: 'Veuillez Sellectionnez un mode SVP !',
          },
        ]}

      name="radiogroup" label="mode :" >
        <Radio.Group  onChange={setMode}>
        <Popover content="Vous le Donnez Gratuitement, vous êtes une personne BIENFAISANTE et GÉNÉREUSE " trigger="click">
          <Radio value="offreGratuit">Offre Gratuit</Radio>
        </Popover>
          <Popover content="Le prix symbolique n'a rien à voir avec la valeur ou la vraie qualité de votre produit, mais avec vous le vendre généreusement à bas prix pour aider les autres " trigger="click">
          <Radio style={{marginLeft:"0px"}} value="prix symbolique">prix symbolique</Radio>
          </Popover>
        </Radio.Group>
      </Form.Item>

      <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.radiogroup !== currentValues.radiogroup}
        >
          {({ getFieldValue }) =>
            getFieldValue('radiogroup') === 'prix symbolique' ? (
              <Form.Item
                name="prix"
                rules={[
                  {
                    required: false,
                  
                  },
                ]}
              >
               <InputNumber direction="vertical" style={{marginLeft:"510px"}} className="fleche"
               defaultValue={10}
               formatter={value => `${value} DT`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
               parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={onChange1}
            />
               
              </Form.Item>
              
            ) : null
          }
        </Form.Item>


     

      
      <Form.Item style={{width:"520px",marginLeft:"45px"}}label="Image" onChange={setimages} >
        <Form.Item rules={[
          {
            required: false,
            message: 'Veuillez insérer une/des image(s) SVP !',
          },
        ]} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Popover content="3 photos maximum" trigger="hover"> <PicturesWall /></Popover>
          
        </Form.Item>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Form.Item  style={{marginLeft:"110px"}} wrapperCol={{
          span: 21,
          offset: 6,
        }}>
        <Button type="primary" htmlType="submit" style={{marginRight:"10px",width:"100px",paddingRight:"70px"}} onClick={handleSubmit}  >
          Envoyer
        </Button>
        <Button  type="primary" htmlType="reset" onClick={handleResetData}>
          Annuler 
        </Button>
      </Form.Item>
      </Form.Item>
    </Form>
    </div>
  );
      
};


