import React ,{useState}  from 'react';
import 'antd/dist/antd.css';
import PicturesWall from '../uploadPic/Uploadpic';
import { Upload, Button } from 'antd';
import { Form, Input,Modal,Space, Select,notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MyUpload from '../uploadPic/MyUpload';
import Card1 from '../Cards/card1';
import Card2 from '../Cards/card2';
import './pubAnnonce.css';


const openNotification = (placement,message) => {
    notification.info({
      message,
      placement,
    });
  };

const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
   const info=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Votre publication a été envoyée et est en attente d’approbation par un Notre expert</center></p>
            </div>
          ),
        });
      }
      const info2=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Votre Annonce est publiée avec succes </center></p>
            </div>
          ),
        });
      }
     

  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };


function Pubrecherhce(){  
  const [titre,setTitre] = useState("");
  const [categorie,setCategorie] = useState("");
  const [Gouvernorat,setGouvernorat] = useState("");
  const [Ville,setVille] = useState("");
  const [ordonnance,setordonnance] = useState("");
  const [image,setimage] = useState("");
  const validAnnonce =()=>{
    if(titre && categorie && Gouvernorat && Ville ){
      return  (categorie !=="Médicament" || ordonnance)
    }
    return false
  }
  
  
  const handleResetData =()=>{
   setTitre("");
   setCategorie("");
  setGouvernorat("");
  setVille("");
  setordonnance("");
  setimage("");
    return true
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(validAnnonce() && categorie==='Médicament'){
      info();
    }else if( validAnnonce() && categorie==='Autre' ||validAnnonce() && categorie==='Soin et Pansements' ||validAnnonce() && categorie ==='Protection'|| validAnnonce() && categorie==='Mobilier Médicale' ){
      info2();
    }else{
      openNotification('bottomRight','Merci de Remplir Tous les Champs obligatoires!');

    }
  }
  

    return (
        <>
        <div >
           <br/> 
         <h2>
           < b style={{marginLeft:"90px"}}>Que Cherchez Vous ?</b> 
        </h2>
        <br/>

        <Form  className="FormRecherche" style={{paddingBottom:"7px" , marginBottom:"20px",width:"700px",fontWeight:"bold"}}>

        <Form.Item name="titre" label="Titre" style={{width:"490px"}} hasFeedback required  rules={[
          {
            required: true,
            message: 'Veuillez Remplir ce champ SVP!',
          },
        ]}>
        <Input  maxLength="50" style={{width:"300px",marginLeft:"40px"}}  onChange={(event)=>{
        setTitre(event.target.value)}} />
        </Form.Item>

        <Form.Item name={['produit', 'Description2']} label="Déscription"  style={{width:"490px"}} hasFeedback required rules={[
          {
            required: true,
            message: 'Veuillez Remplir ce champ SVP!',
          },
        ]}>
        <Input.TextArea placeholder="Je cherche ..."maxLength="800" style={{width:"300px"}} />
      </Form.Item>

      <Form.Item
        name="selectGouv"
        label="Gouvernorat"
        hasFeedback
        style={{width:"480px",marginRight:"10px"}}
        rules={[
          {
            required: true,
            message: 'Selectionnez votre Région SVP',
          },
        ]}
      >
        <Select style={{width:"300px"}} placeholder="Selectionnez votre gouvernorat " onChange={setGouvernorat}>
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

       <Form.Item hasFeedback  name="Ville" label="Ville:" style={{width:"485px",marginLeft:"0px"}} rules={[
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
        <Input type="text" style={{width:"300px",marginLeft:"45px", fontWeight:"bold"}}  placeholder="Saisir votre Ville "  
         onChange={(event) => {
            setVille( event.target.value)
          }}
    />
      </Form.Item>


      <Form.Item
      
      style={{width:"480px",marginRight:"10px"}}
        name="selectMedRech"
        label="Catégorie"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez Selectionnez la catégorie',
          },
        ]}
      >
        <Select style={{width:"300px",marginLeft:"23px"}} placeholder="Selectionnez une Categorie" onChange={setCategorie}>
          <Option  value="Médicament">Médicament</Option>
          <Option value="Mobilier Médicale">Mobilier Médicale</Option>
          <Option value="Protection">Protection</Option>
          <Option value='Soin et Pansements'>Soin et Pansements</Option>
          <Option value='Autre'>Autre </Option>
        </Select>
    </Form.Item>

    <Form.Item
        style={{width:"430px",marginLeft:"100px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.selectMedRech !== currentValues.selectMedRech}
        >
          {({ getFieldValue }) =>
            getFieldValue('selectMedRech') === 'Médicament' ? (
              <Form.Item
              style={{width:"400px"}}
                name="ordonnance"
                rules={[
                  {
                    required: true,
                    message:"veuillez insérer une image de votre Ordonnance médicale SVP"
                  },
                ]}
              >
                <Card1 /><br/>
             <MyUpload style={{marginLeft:"3px"}} onChange={(event)=>{
        setordonnance(event.target.value)
        }} />
              </Form.Item>
              
            ) : null
          }
        </Form.Item>
        <Form.Item
        style={{width:"430px",marginLeft:"100px" ,marginTop:"-50px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.selectMedRech !== currentValues.selectMedRech}
        >
          {({ getFieldValue }) =>
            getFieldValue('selectMedRech') === 'Autre' ||getFieldValue('selectMedRech') === 'Soin et Pansements'||getFieldValue('selectMedRech') === 'Mobilier Médicale' ||getFieldValue('selectMedRech') ===  'Protection' ? (
              <Form.Item
              style={{width:"400px"}}
                name="image"
                rules={[
                  {
                    required: true,
                    message:"veuillez insérer une image SVP"
                  },
                ]}
              >
                <Card2 /><br/>
             <MyUpload style={{marginLeft:"3px"}} />
              </Form.Item>
              
            ) : null
          }
        </Form.Item>

        {/* <Form.Item label="Images" style={{width:"300px"}}rules={[
          {
            required:false,
            message: 'veuillez sélectionner une image',
          },
        ]} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} >
            <PicturesWall />
        </Form.Item> */}

      


       <Form.Item  style={{marginLeft:"100px"}} wrapperCol={{
          span: 11,
          offset: 6,
        }}>
        <Button type="primary" htmlType="submit" style={{marginRight:"20px",width:"100px",paddingRight:"20px"}} onClick={handleSubmit} >
          Envoyer
        </Button>
        <Button style={{}} type="primary" htmlType="reset" onClick={handleResetData}>
          Annuler 
        </Button>
      </Form.Item>

        </Form>
        </div>
        </>
    );
}
export default Pubrecherhce;

