import React, { useState, useContext, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';
import PicturesWall from '../uploadPic/uploadpiccc';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Tags from './Tags/Tags';
import { AuthContext } from '../../Context/AuthContext';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {
  Form,
  Modal,
  Select,
  DatePicker,
  Space,
  Input,
  Radio,
  Button,
  InputNumber,
  notification,
  Popover
} from 'antd';

import "./pubAnnonce.css";

/**************components pour le design ***************/
const openNotificationwarning = (placement, message) => {
  notification.warning({
    message,
    placement,
  });
};

const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};


/***Fonctions pour design****/

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

export default function Annonce() {
  /*
  ******************************************
   *                    States             /
   * ****************************************
   */
  const [titre, setTitre] = useState("");
  const [Description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [dateFabrication, setDateFabrication] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [Dosage, setDosage] = useState("");
  const [Gouvernorat, setGouvernorat] = useState("");
  const [Ville, setVille] = useState("");
  const [mode, setMode] = useState("");
  const [prix, setPrix] = useState(10);

  /*
   ******************************************
    *                  Functions            /
    * ***************************************
    */

  const validAnnonce = () => {
    if (titre && categorie && Gouvernorat && Ville && mode && Description) {
      return ((categorie !== "Médicament" || dateExpiration && dateFabrication && Dosage) || (mode === "prix symbolique" && prix !== 0 || mode !== "prix symbolique") || (mode === "Offre Gratuit" || prix === 0))
    }
    return false
  }


  const handleResetData = () => {
    setTitre("");
    setDescription("");
    setCategorie("");
    setDateExpiration("");
    setDateFabrication("");
    setDosage("");
    setDosage("");
    setGouvernorat("");
    setMode("");
    setVille("");
    setPrix("");
    return true
  }

  const history = useHistory();

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  /**************UPLOAD IMAGES************ */
  const [state, setState] = useState({ previewVisible: false, previewImage: "", fileList: [] })
  const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  

  const handleChange = ({fileList}) => {
  
    setState({ fileList });
    console.log('images ::::',state.fileList)
  };

  const [img, setImg]=useState([])


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Ajouter Images</div>
    </div>
  );
  /******************************************** */

  const authContext = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(validAnnonce())
    for (let i = 0; i < state.fileList.length; i++)
    {
      let url = state.fileList[i].thumbUrl;
      
          console.log('ii : ', state.fileList[i].thumbUrl)
      img.push(url)
      
         // formData.append('images',state.fileList[i].thumbUrl)
    }
    
    const dataA = {
      
        userId : authContext.auth.id,
        userName : authContext.auth.nom,
        Titre : titre,
        Description :Description,
        Gouvernorat :Gouvernorat,
        ville : Ville,
        Prix :prix,
        TypeAnnonce :"Annonce d'offre gratuit /Vente(Prix Symbolique)",
        Catégorie : 'NonMedicament',
        TypeNonmedicament :categorie,
        images :img
        
    }

    if (validAnnonce()) {
      if (categorie === 'mobilier medicale' || categorie === 'Soin et Pansement' || categorie === 'Protection' || categorie === 'Autre') {
       
        //  console.log(state.fileList[0])
        
        const config = {
          "headers": {
            "content-type": 'application/json'
          }
        }
        console.log('imagessss: ', img)
        axios.post(`http://localhost:4000/nonMedicament/ajouter`, 
          dataA
        , config)
          .then((res) => {
            openNotificationsucces('bottomRight', "Votre Annonce est envoyée et est en attente d'approbation par un administrateur")
            console.log("NonMedicament Ajoutee")
            console.log(res)
            // const { fileName, filePath } = res.data.images
            // setUploadFile({ fileName, filePath })
          }).catch((error) => {
            console.log(" echec Nonmedicament non ajoutee ");
            console.log(error.response)
          });
        setTimeout(() => {
          history.push('/')
        }, 2000)
      } else if (categorie === 'Médicament') {

        const formData = new FormData();
        formData.append('userId', authContext.auth.id)
        formData.append('userName', authContext.auth.nom)
        formData.append('Titre', titre)
        formData.append('Description', Description)
        formData.append('Gouvernorat', Gouvernorat)
        formData.append('ville', Ville)
        formData.append('Prix', prix)
        formData.append('TypeAnnonce', "Annonce d'offre gratuit /Vente(Prix Symbolique)")
        formData.append('Catégorie', 'NonMedicament')
        formData.append('TypeNonmedicament', categorie)
        formData.append('images', authContext.state)
        // const Medic = {
        //   userId: authContext.auth.id,
        //   userName: authContext.auth.Nom,
        //   Titre: titre,
        //   Image: myData,
        //   Description: Description,
        //   Gouvernorat: Gouvernorat,
        //   Ville: Ville,
        //   Prix: prix,
        //   Dosage: Dosage,
        //   dateFabrication: dateFabrication,
        //   dateExpiration: dateExpiration,
        //   TypeAnnonce: "Annonce d'offre gratuit /Vente(Prix Symbolique)",
        //   Catégorie: "Medicament",

        // };
        // console.log(Medic);
        axios.post(`http://localhost:4000/medicament/ajouter`, formData)
          .then((res) => {
            openNotificationsucces('bottomRight', "Votre Annonce est envoyee et est en attente d'approbation par un administrateur")
            console.log("Medicament Ajoutee")
            console.log(res.data)
            console.log(res)
          }).catch((error) => {
            console.log(" echec medicament non ajoutee ");
            console.log(error.response)
          });
      }
      // setTimeout(() => {
      //   history.push('/')
      // }, 2000)
    } else {
      openNotificationwarning('bottomRight', 'Merci de Remplir Tous les Champs obligatoires!');
      console.log(" Echec Echech ")
    }
  }



  return (
    <div style={{ paddingTop: "15px", marginBottom: "20px" }} className="pubAnnonce" id="pubAnnonce">

      <Form
        style={{ marginRight: "140px", fontWeight: "bold" }}
        name="validate_other"
        {...formItemLayout}
      >
        <Form.Item
          style={{ width: "460px" }}
          name={['produit', 'titre']}
          label="Titre"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Veuillez Remplir ce champ !',
            },
          ]}
        >
          <Input maxLength="50" style={{ width: "300px", marginLeft: "73px" }} onChange={(event) => {
            setTitre(event.target.value)
          }} />
        </Form.Item>

        <Form.Item name='Description' label="Déscription" style={{ width: "465px", marginLeft: "80px" }}>
          <Input.TextArea maxLength="800" style={{ width: "360px", marginLeft: "35px" }} onChange={(event) => {
            setDescription(event.target.value)
          }}
          />
        </Form.Item>

        <Form.Item
          style={{ width: "455px", marginLeft: "60px" }}
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
          <Select placeholder="Selectionnez la Catégorie" value={categorie} style={{ width: "300px", marginLeft: "43px" }} onChange={setCategorie}>
            <Option value="Médicament">Médicament</Option>
            <Option value="mobilier medicale">Mobilier médicale</Option>
            <Option value="Protection">Protection</Option>
            <Option value='Soin et Pansement'>Soin et Pansements</Option>
            <Option value='Autre'>Autre</Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginLeft: "340px", marginTop: "2px", marginBottom: "0px" }}
          shouldUpdate={(prevValues, currentValues) => prevValues.Catégorie !== currentValues.Catégorie}
        >
          {({ getFieldValue }) =>
            getFieldValue('Catégorie') === 'Médicament' ? (
              <Form.Item style={{ marginTop: "0px", marginBottom: "0px" }}  >
                <center>
                  <Form.Item
                    name="dateFabrication"
                    label="date F"
                    rules={[
                      {
                        required: true,
                        message: "la date de fabrication est obligatoire !",
                      },
                    ]}
                  >
                    <Space direction="vertical" >
                      <DatePicker onChange={(value) => {
                        if (value) {
                          const date = new Date(value["_d"]);
                          setDateFabrication(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);
                        }
                      }} />
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
                        message: "la date d'expiration est obligatoire !",
                      },
                    ]}
                  >
                    <Space direction="vertical" >
                      <DatePicker onChange={(value) => {
                        if (value) {
                          const date = new Date(value["_d"]);
                          setDateExpiration(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`);
                        }
                      }} />
                    </Space>
                  </Form.Item>
                </center>
                <Form.Item
                  name="Dosage"
                  label="Dosage"
                  rules={[
                    {
                      required: true,
                      message: 'Veuillez Remplir ce champ !',
                    },
                  ]}
                >
                  <Input maxLength="20" placeholder="en mg,ml,nombre de comprimés ..." style={{ fontWeight: "bold", width: "300px" }} onChange={(event) => {
                    setDosage(event.target.value)
                  }} />
                </Form.Item>

              </Form.Item>
            ) : null
          }
        </Form.Item>


        <Form.Item
          style={{ width: "364px", marginLeft: "30px" }}
          name="select"
          label="Gouvernorat :"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Veuillez Remplir ce champ !',
            },
          ]}
        >
          <Select style={{ width: "300px", marginLeft: "35px", marginTop: "-30px" }} placeholder="Selectionnez votre gouvernorat" onChange={setGouvernorat}>
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
            <Option value="Monastir">Monastir</Option>
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

        <Form.Item hasFeedback name="Ville" label="Ville:" style={{ width: "455px", marginLeft: "0px" }} rules={[
          {
            required: true,
            message: 'Veuillez Remplir ce champ !'

          },
          {
            pattern: new RegExp(
              /^[a-zA-Z\s]*$/
            ),
            message: 'Veuillez Entrer que des Lettres SVP!',
          }
        ]}>
          <Input type="text" maxLength="30" style={{ width: "300px", marginLeft: "72px", fontWeight: "bold" }} placeholder="Saisir votre Ville " onChange={(event) => {
            setVille(event.target.value)
          }} />

        </Form.Item>

        <Form.Item style={{ width: "600px", marginLeft: "94px" }} rules={[
          {
            required: true,
            message: 'Veuillez Sellectionnez un mode SVP !',
          },
        ]}

          name="radiogroup" label="mode :" >
          <Radio.Group onChange={(event) => { setMode(event.target.value) }}>
            <Popover content="Vous le Donnez Gratuitement, vous êtes une personne BIENFAISANTE et GÉNÉREUSE " trigger="click">
              <Radio value="Offre Gratuit">Offre Gratuit</Radio>
            </Popover>
            <Popover content="Le prix symbolique n'a rien à voir avec la valeur ou la vraie qualité de votre produit, mais avec vous le vendre généreusement à bas prix pour aider les autres " trigger="click">
              <Radio style={{ marginLeft: "0px" }} value="prix symbolique">prix symbolique</Radio>
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
                <InputNumber direction="vertical" style={{ marginLeft: "510px" }} className="fleche"
                  // defaultValue={prix}
                  formatter={value => `${value} DT`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={(value) => { setPrix(value >= 0 ? value : 0); }}
                />

              </Form.Item>

            ) : null
          }
        </Form.Item>

        <Form.Item
          name="Tags"
          label="tags"
          style={{ marginLeft: "110px", width: "650px" }}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Tags />
        </Form.Item>

        <Form.Item name="images" style={{ width: "520px", marginLeft: "45px" }} label="Image" >
          <Form.Item
            name="images"
            rules={[
              {
                required: false,
                message: 'Veuillez insérer une/des image(s) SVP !',
              },
            ]}
            name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Popover content="3 photos maximum" trigger="hover">
              <div>
                <div>
                  <Upload
                    name="images"
                    accept="image/png, image/jpeg"
                    listType="picture-card"
                    fileList={state.fileList}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                  >
                    {state.fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                 
                  <Modal
                    visible={state.previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img alt="example" style={{ width: "100%" }} src={state.previewImage} />
                  </Modal>
                </div>
              </div>
            </Popover>

          </Form.Item>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Form.Item style={{ marginLeft: "110px" }} wrapperCol={{
            span: 21,
            offset: 6,
          }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: "10px", width: "100px", paddingRight: "70px" }} onClick={handleSubmit}  >
              Envoyer
            </Button>
            <Button type="primary" htmlType="reset" onClick={handleResetData}>
              Annuler
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );

}
