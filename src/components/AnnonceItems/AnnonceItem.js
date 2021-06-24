
import { Link, useHistory } from 'react-router-dom';
import { generatePath } from "react-router";
import Slideshow from '../SlidesPubpictures/index';

import MyUpload from '../uploadPic/MyUpload1';
import React, { useState, useContext } from "react";
import { Popconfirm } from 'antd';
import { Upload, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ShareButtons from '../Button/ShareButton';
import { HeartFilled } from '@ant-design/icons';
import { Switch } from 'antd';
import LikeButton from "../Button/LikeButton";
import './AnnonceItem.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Comment, Avatar, Form, Button, List, Input, Popover, Drawer, Alert, notification } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './index.css';
import { AuthContext } from '../../Context/AuthContext';
import { TagTwoTone, EnvironmentTwoTone } from '@ant-design/icons';
import axios from 'axios';

/********Partie des Commentaire******* */
const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'commentaire(s)'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button style={{ marginRight: "680px", width: "180px", paddingLeft: "0px", borderRadius: "3px" }} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Ajouter un commentaire
      </Button>
    </Form.Item>
  </>
);

class AnnonceComment extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };


  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="/assets/images/anonyme.jpg"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

/************Notification et message d'erreur/succes *********/
const styledrawer = {
  width: "600px"
}
const info = () => {
  Modal.success({
    content: (
      <div>
        <p><center>Votre Message est envoyé avec succés , veuillez vérifier dans votre boite de messagerie </center></p>
      </div>
    ),
  });
}
const info2 = () => {
  Modal.success({
    content: (
      <div>
        <p><center>Votre Publication est Supprimée</center></p>
      </div>
    ),
  });
}

const info4 = () => {
  Modal.error({
    content: (
      <div>
        <p><center>Veuillez Saisir un message !</center></p>
      </div>
    )
  });
}

const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};


/********************************Modele de L'annonce DE vente/offre*************************************** */
const AnnonceItem = (props) => {

  const [ordonnanceName, setOrdonnanceName] = useState();
  const [ordonnance, setOrdonnance] = useState()
  const [message, setMessage] = useState();
  const validMessage = () => {
    if (message)
      return true;
    else
      return false;
  }
  // const onchangeImage = e => {
  // e.preventDefault();
  //   setOrdonnanceName(e.target.files[0])
  //   console.log(ordonnanceName)
  // }

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    if (validMessage()) {
      const data = new FormData();
      data.append('expediteur', authContext.auth.id)
      data.append('destinataire', props.iduser)
      data.append('Idannonce', props.id)
      data.append('contenu', ordonnance)

      for (var key of data.entries()) {
        console.log(key[0] + ', ' + key[1]);
      }
      axios.post(`http://localhost:4000/formulaireOrdonnance/ajouter`, data)
        .then((res) => {
          console.log("ajout ordonnance Ok ")
          console.log(res)
        }).catch((error) => {
          console.log(error.response)
        });
    } else {
      console.log("fama ghlat")
    }
  }
  const handleresetMessage = () => {
    setMessage("");
    setOrdonnanceName("");
    setOrdonnance();
    return true
  }
  /************************************* */
  const authContext = useContext(AuthContext);

  let loggedIn = false;
  if (authContext.auth.id) {
    loggedIn = true;
  }
  /******Ordonnance medicale drawer ********* */
  // const props1 = {
  //   beforeUpload: file => {
  //     if (file.type !== 'image/png') {
  //       message.error(`${file.name} is not a png file`);
  //     }
  //     return file.type === 'image/png' ? true : false;
  //   }
  // }
  //   onChange: info => {
  //     setOrdonnanceName(info);
  //     console.log("ordonnance name :", ordonnanceName)
  //     console.log("info :", info)
  //   }
  // }


  /*********Changer etat annonce *********/
  const handleChangeEtat = (event) => {
    const etat = {
      Etat2Anononce: 'Resolue'
    }
    axios.put(`http://localhost:4000/annonce/modifier/${props.id}`, etat)
      .then(response => {
        console.log(response)
      }
      ).catch(error => {
        console.error('There was an error!', error);
      });
  }
  /*************Ajouter aux favoris**********/
  const [state1, setState1] = useState({ liked: false });
  const changeColour = state1.liked ? "red" : "grey"
  const toggleLike = () => {
    setState1({
      liked: !state1.liked
    })
  }
  const handleAJoutFavoris = (event) => {

    const Favoris = {
      id_user: authContext.auth.id,
      id_annonce: props.id
    }
    axios.post(`http://localhost:4000/favoris/ajouter`, Favoris)
      .then((res) => {
        console.log("Favoris Ok ")
        console.log(res.data)
      }).catch((error) => {
        console.log(error.response)
      });
    console.log(props.idAnnonce)
  }

  /************PopOver********* */

  const [visibleClick, setVisibleClick] = useState(false);

  const hide = () => {
    setVisibleClick(false);
  };

  const handleVisibleChange = () => {
    setVisibleClick(true);
  };
  const [etat, setEtatAnnonce] = useState("");
  const [reclamation, setReclamation] = useState("");
  const [titreReclamation, setTitreReclamation] = useState("");
  const validReclamation = () => {
    if (reclamation)
      return true;
    else
      return false;
  }


  const handleSupprimer = (event) => {
    event.preventDefault();
    console.log(props.id)
    axios.delete(`http://localhost:4000/annonce/supprimer/${props.id}`)
      .then(res => {
        info2();
        console.log(res);
        console.log(res.data);
      }).catch((error) => {
        console.log(error.response)
      });
    setTimeout(() => {
      history.push('/')
    }, 1000)
  }

  const handleResetReclamation = () => {
    setReclamation("");
    console.log("Reclamee")
    return true;
  }

  const handleValidReclamation = (event) => {
    event.preventDefault();
    const Rec = {
      IdExpediteur: authContext.auth.id,
      idAnnonce: props.id,
      Expediteur: authContext.auth.nom,
      // Titre_reclamation: titreReclamation,
      Contenu: reclamation
    }
    if (validReclamation()) {
      axios.post(`http://localhost:4000/reclamation/ajouter`, Rec)
        .then((res) => {
          openNotificationsucces('bottomRight', 'Votre réclamations envoyée à notre administrateur pour la traiter! ');
          console.log("Reclamation Ok ")
          console.log(res.data)
          console.log(res)
        }).catch((error) => {
          console.log(error.response)
        });
    } else {
      console.log(" Echec Reclamation ")
    }
  }
  /***********Drawer **********/
  const [visibleDrawer, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    console.log("drawer opened")
    setDrawerVisible(true);
  };

  const onClose = () => {
    console.log("drawer Closed")
    setDrawerVisible(false);
  };

  /**************Model ***************/
  const [id, setId] = useState("");
  const history = useHistory();

  const handleProceed = (e) => {
    id && history.push(generatePath("/:id", { id }));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    console.log("props id ", props.id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push({ pathname: `${props.pathBack}` })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.push({ pathname: `${props.pathBack}` })
  }
  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link"
          to={{
            pathname: `${props.path}/${props.id}`
          }}

          onClick={(e) => {
            // setId(props.id);
            // console.log("lid de cette annonce est :", id)
            // handleProceed();
            showModal();

          }}  >
          <figure style={{ transform: "scale(1.1)" }} className="cards__item__pic-wrap" data-category={props.label}>
            <img className="cards__item__img"
              src={props.src}
            // alt="medicament"
            />
          </figure>
          <div className="cards__item__info" >
            <h5 className="cards__item__text"> {props.title}</h5>
          </div>
        </Link>

        <Modal className="modal" title={props.moffre} width={970} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div >
            <center> <h2>  {props.title}</h2></center>
            <center><div style={{ backgroundColor: "#f0f0f5", borderRadius: "5px", height: "400px", paddingTop: "20px" }}> <Slideshow
              interval={3000}
              images={[
                '/assets/images/lit3.jpg',
                '/assets/images/lit.jpg',
                '/assets/images/lit2.jpg',
              ]}
            /></div></center> <br />
            <div style={{ display: "inline-block", flexDirection: "row", position: "relative" }} >
              <div style={{ marginLeft: "95px", display: "inline-block", flexDirection: "row", position: "relative" }}><center><h3><b><TagTwoTone twoToneColor="#52c41a" /> {props.prix} DT</b></h3></center></div>
              <div style={{ marginLeft: "80px", display: "inline-block", flexDirection: "row", position: "relative" }}><center><h3> <b>  <EnvironmentTwoTone twoToneColor="#52c41a" />{props.lieu} , {props.ville}</b></h3></center></div>
              <div style={{ marginLeft: "80px", display: "inline-block", flexDirection: "row", position: "relative" }}><center><h3> <b><Button style={{ textAlign: "center", width: "120px", borderColor: "#52c41a", borderRadius: "5px", color: "black", backgroundColor: "#e6ffe6" }} type="primary" onClick={showDrawer}> <b>Chat</b> </Button></b></h3></center></div>
              <div style={{ marginLeft: "80px", display: "inline-block", flexDirection: "row", position: "relative" }}><Popover content="Ajoutez cette publication aux favoris" trigger="hover"> <Button style={{ borderColor: "#52c41a", backgroundColor: "#e6ffe6", borderRadius: "15px" }} className="likeBtn" onClick={(event) => { toggleLike(); handleAJoutFavoris(event); }}>
                <HeartFilled style={{ fontSize: "14px", color: changeColour, marginLeft: "4px" }} />
              </Button></Popover></div>
              <br /><br />
              <hr />
              <br />
              <b style={{ fontSize: "17px" }}>Annonce de <Link to={{
                pathname: `/profile/${props.iduser}`
              }}
              >{props.username} </Link></b> <br />
              <p style={{ color: "grey" }}> publiée le :{props.dateAnn}</p>
              <b style={{ fontSize: "17px" }}>Description :</b> <p>{props.desc} </p><br /><p>{props.dateFab} {props.dateExp} {props.dosage}</p>
              <br />
              <hr />
              <br />
              <center><AnnonceComment /></center>

              <center><ShareButtons /></center>
              <div style={{ marginLeft: "660px", display: "inline-flex", flexDirection: "row" }}>
                {loggedIn === true && (authContext.auth.id !== props.iduser) ? <>
                  <Popover
                    title="Reclamation Annonce"
                    trigger="click"
                    content={<> <Form>
                      <Form.Item name="reclamation">
                        <Input placeholder="pourquoi Reclamez-vous cette annonce?" onChange={(event) => {
                          setReclamation(event.target.value)
                        }} />
                      </Form.Item>
                      <center className="Buttons" >
                        <Button type="primary" htmlType="submit" onClick={handleValidReclamation}>Envoyer</Button>
                        <Button type="primary" htmlType="reset" onClick={handleResetReclamation}>Annuler</Button>
                      </center>
                    </Form> </>}
                    visibleClick={visibleClick}
                    onVisibleChangeClick={handleVisibleChange}
                  > <Button type="dashed" danger > Reclamer annonce </Button></Popover>
                </>
                  :
                  <>
                    <Popconfirm title="êtes-vous sûr de vouloir supprimer cette annonce ?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={handleSupprimer}>
                      <Button style={{ borderRadius: "6px" }} type="dashed" danger>supprimer annonce</Button>
                    </Popconfirm>

                    <Switch checkedChildren="Resolue" unCheckedChildren="Disponible" style={{ marginLeft: "10px", marginTop: "4px" }} onClick={handleChangeEtat} />
                  </>}
              </div>
            </div>
          </div>

        </Modal>

        <Drawer
          contentWrapperStyle={styledrawer}
          title="Chat"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visibleDrawer}
        >
          <div style={{ display: "inline-flex", flexDirection: "row", marginTop: "20px" }} >
            <p style={{ marginLeft: "5px", marginTop: "10px" }}><b>Annonce Concernée :</b><img style={{ width: "60px", height: "60px", marginLeft: "20px" }} src={props.src} /></p>
            <p style={{ marginLeft: "150px", marginTop: "25px" }}><b>Contact :</b> <b>{props.username}</b> </p>
          </div>
          <br /><br />
          <hr />
          <br />
          <div>
            <center>
              <form encType="multipart/form-data"  >
                <label>"Veuillez écrire votre message ici:"
                  <TextArea rows={4} style={{ width: "450px", height: "100px", marginTop: "20px" }} onChange={(event) => {
                    setMessage(event.target.value);
                    console.log(message);
                  }} />
                </label>
                <Alert
                  style={{ width: "400px", marginBottom: "10px" }}
                  message="Information"
                  description=" Si vous demandez un médicament ,Veuillez montrer Votre ordonnance médicale"
                  type="info"
                  showIcon
                />

                {/* <Upload {...props1}
                  >
                    <Button icon={<UploadOutlined />} >Télécharger Image (png)</Button>
                  </Upload> */}
                <input type='file'
                  accept='.png'
                  filename='contenu'
                  // className="form-control-file"
                  onChange={(e) => { setOrdonnance(e.target.files[0]); console.log("lordonnance est :", ordonnance, "son nom est ", e.target.files[0].name) }}
                />
                <Button type="primary" htmlType="submit" onClick={handleSubmitMessage}>
                  Envoyer
                </Button>
                <Button style={{ marginLeft: "20px" }} type="primary" htmlType="reset" onClick={handleresetMessage}  >
                  Annuler
                </Button>
              </form>
            </center>
          </div>
        </Drawer>
      </li>
    </>
  )
}

export default AnnonceItem;
