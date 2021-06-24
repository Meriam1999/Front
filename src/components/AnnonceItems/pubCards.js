
import ReactDOM from 'react-dom';
import ShareButtons from '../Button/ShareButton';
import 'antd/dist/antd.css';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';
import { generatePath } from "react-router";
import LikeButton from "../Button/LikeButton";
import React, { useState, useContext } from "react";
import './index.css';
import '../AnnonceItems/index.css'
import { Card, Form, Comment, Avatar, Input, List, Drawer, Popover, Popconfirm, notification, Switch } from 'antd';
import { Modal, Button } from 'antd';
import { EnvironmentTwoTone, QuestionCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import { AuthContext } from '../../Context/AuthContext';




/****************Partie Commentaiiire ***********/
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
            author: 'Han Solo',
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
const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};

const info4 = () => {
  Modal.error({
    content: (
      <div>
        <p><center>Veuillez Saisir un message !</center></p>
      </div>
    )
  });
}
const handleChangeEtat = (event) => {
  const etat = {
    Etat2Anononce: 'Resolue'
  }
  // axios.put(`http://localhost:4000/annonce/modifier/${props.idAnnonce}`, etat)
  //   .then(response => {
  //     console.log(response)
  //   }
  //   ).catch(error => {
  //     console.error('There was an error!', error);
  //   });
}

/***************Partie Carrd****************** */
const Cardpub = (props) => {
  const [visible, setVisible] = useState(false);
  const authContext = useContext(AuthContext);

  let loggedIn = false;
  if (authContext.auth.id) {
    loggedIn = true;
  }

  /****************Message **********8*/

  const [message, setMessage] = useState("");

  const validMessage = () => {
    if (message)
      return true;
    else
      return false;
  }

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    if (validMessage()) {
      info();

    } else {
      info4();
    }
  }
  /**********Reclamation********* */
  const [reclamation, setReclamation] = useState("");
  const [titreReclamation, setTitreReclamation] = useState("");
  const validReclamation = () => {
    if (reclamation)
      return true;
    else
      return false;
  }


  const handleResetReclamation = () => {
    setReclamation("");
    console.log("Reclamee")
    return true;
  }

  const handleValidReclamation = (event) => {
    event.preventDefault();
    const Rec = {
      Titre_reclamation: titreReclamation,
      Contenu: reclamation
    }
    if (validReclamation()) {
      axios.post(`http://localhost:4000/reclamation/ajouter`, Rec)
        .then((res) => {
          openNotificationsucces('bottomRight', 'Votre réclamations envoyée à notre administrateur pour la traiter! ');
          console.log("Reclamation Ok ")
          console.log(res.data)
        }).catch((error) => {
          console.log(error.response)
        });
    } else {
      console.log(" Echec Reclamation ")
    }
  }

  const handleresetMessage = () => {
    setMessage("");
    return true
  }
  /********PopOver********* */

  const [visibleClick, setVisibleClick] = useState(false);

  const hide = () => {
    setVisibleClick(false);
  };

  const handleVisibleChange = () => {
    setVisibleClick(true);
  };

  /*******Drawer **********/
  const [visibleDrawer, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    console.log("drawer opened")
    setDrawerVisible(true);
  };

  const onClose = () => {
    console.log("drawer Closed")
    setDrawerVisible(false);
    history.push(generatePath("/"))
  };

  /**************Model *******/
  const [id, setId] = useState();
  const history = useHistory();

  const handleProceed = (e) => {
    id && history.push(generatePath("/annonceRecherche/annonce/:id", { id }));
  };

  return (
    <>

      <Modal
        title="Annonce de Recherche"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={940}
      >
        <div>
          <center> <h2> {props.title}</h2></center>
          <img style={{ borderRadius: "5px", height: "380px", width: "450px", marginLeft: "200px", backgroundColor: "#f0f0f5" }} src='/assets/images/chaiseroulante11.jpg' />
          <div style={{ display: "inline-block", flexDirection: "row", position: "relative", marginTop: "10px" }} >
            <div style={{ marginLeft: "180px", display: "inline-block", flexDirection: "row", position: "relative" }}><center><h3> <b>  <EnvironmentTwoTone twoToneColor="#52c41a" />{props.lieu},{props.ville}</b></h3></center></div>
            <div style={{ marginLeft: "90px", display: "inline-block", flexDirection: "row", position: "relative" }}><center><h3> <b><Button style={{ textAlign: "center", width: "120px", borderColor: "#52c41a", borderRadius: "5px", color: "black", backgroundColor: "transparent" }} type="primary" onClick={showDrawer}> <b>Chat</b> </Button></b></h3></center></div>
            <div style={{ marginLeft: "90px", display: "inline-block", flexDirection: "row", position: "relative" }}> <center><Popover content="Ajoutez cette publication aux favoris" trigger="hover"> <LikeButton type="primary" /> </Popover></center></div>
          </div>
          <hr />
          <br />
          <b style={{ fontSize: "17px" }}>Annonce de <Link to={{
            pathname: `/profile/${props.iduser}`
          }}
          >{props.username} </Link></b> <br />
          <p style={{ color: "grey" }}> publiée le :{props.dateAnn}</p>
          <b style={{ fontSize: "17px" }}>Description : </b> <p>{props.desc}</p>
          <br />
          <center><AnnonceComment /></center>
          <center><ShareButtons /></center>
          <div style={{ marginLeft: "640px", display: "inline-flex", flexDirection: "row" }}>

            {loggedIn == true && (authContext.auth.id !== props.iduser) ? <>
              <Popover
                title="Reclamation Annonce"
                trigger="click"
                content={<> <Form>
                  <Form.Item name="reclamation">
                    <Input placeholder="Titre reclamation?" onChange={(event) => {
                      setTitreReclamation(event.target.value)
                    }} />
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
            </> :
              <>
                <Popconfirm title="êtes-vous sûr de vouloir supprimer cette annonce ?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                  <a href="#">supprimer</a>
                </Popconfirm>
                <Switch checkedChildren="Resolue" unCheckedChildren="Disponible" style={{ marginLeft: "10px" }} onClick={handleChangeEtat} />
              </>
            }
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
            <Form>
              <Form.Item name="message" label="Veuillez écrire votre message ici:">
                <TextArea rows={4} style={{ width: "450px", height: "100px", marginTop: "20px" }} onChange={(event) => {
                  setMessage(event.target.value)
                }} />
              </Form.Item>

              <Form.Item style={{ marginLeft: "20px" }}>
                <Button type="primary" htmlType="submit" onClick={handleSubmitMessage}  >
                  Envoyer
                </Button>
                <Button style={{ marginLeft: "20px" }} type="primary" htmlType="reset" onClick={handleresetMessage}  >
                  Annuler
                </Button>
              </Form.Item>
            </Form>
          </center>
        </div>
      </Drawer>

      <Card className="cardd" title={props.moffre} bordered={false} extra={
        // <Link to={{
        //   pathname: `${props.path}/${props.id}`
        // }}> 
        <Button onClick={() => {
          setVisible(true); setId(props.id);
          console.log("lid de cette annonce est :", id)
        }} >Détailles</Button>
        // </Link>
      } >
        <p><b style={{ color: "green" }} >Titre :</b>{props.title} </p>
        <p><b style={{ color: "green" }} >Description :</b>{props.desc} </p>
        <b ><EnvironmentTwoTone twoToneColor="#52c41a" />{props.lieu},{props.ville}</b>
      </Card>

    </>
  );
}

export default Cardpub;