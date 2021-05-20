
import {Link} from 'react-router-dom';
import Slideshow from '../SlidesPubpictures/index';
import MyUpload from'../uploadPic/MyUpload';
import React, { useState } from "react";
import { Popconfirm, message} from 'antd';
import ShareButtons from '../Button/ShareButton';
import { Card } from 'antd';
import LikeButton from "../Button/LikeButton";
import './AnnonceItem.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal,Comment, Avatar, Form, Button, List, Input, Popover,Drawer,Alert,notification} from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './index.css';
import { TagTwoTone, EnvironmentTwoTone , SmileOutlined}from '@ant-design/icons';


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
        <Button style={{marginRight:"680px",width:"180px",paddingLeft:"0px",borderRadius:"3px"}} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
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

render(){ const { comments, submitting, value } = this.state;


    return (
        <>
         {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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


const styledrawer={
  width:"600px"
}
 const info=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Votre Message est envoyé avec succés , veuillez vérifier dans votre boite de messagerie </center></p>
            </div>
          ),
        });
      }

    const openNotification = (placement,message) => {
    notification.info({
      message,
      placement,
    });
  };

 const info1=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Votre Reclamation est enovyée avec succés</center></p>
            </div>
          )
        });
      }

      const openNotification2 = (placement,message) => {
    notification.info2({
      message,
      placement,
    });
  };
  const info3=()=> {
        Modal.error({
          content: (
            <div>
              <p><center>Veuillez Saisir Votre Reclamation!</center></p>
            </div>
          )
        });
      }
       const info4=()=> {
        Modal.error({
          content: (
            <div>
              <p><center>Veuillez Saisir un message !</center></p>
            </div>
          )
        });
      }


  /*********************************************************************** */
const AnnonceItem = (props) => {

  /****************Message ****8*/

 const [message,setMessage]=useState("");

  const validMessage=()=>{
    if(message)
    return true;
    else
    return false;
  }
  
const handleSubmitMessage =(event) =>{
    event.preventDefault();
    if(validMessage()){
      info();

    }else{
      info4();
    }
  }

const handleresetMessage=()=>{
  setMessage("");
  return true
 }

  /********PopOver********* */

  const [ visibleClick , setVisibleClick]=useState(false);
  
  const hide = () => {
      setVisibleClick(false);
  };

  const handleVisibleChange =()=> {
    setVisibleClick(true);
  };

  const [reclamation , setReclamation] = useState(false);
  const validReclamation=()=>{
    if(reclamation)
    return true;
    else
    return false;
  }

  const handleResetReclamation =()=>{
   setReclamation("");
   console.log("supprime")
   return true; 
  }

   const handleValidReclamation= (event) => {
    event.preventDefault();
    if(validReclamation()){
      info1();

    }else{
      info3();

    }
  }
   /*******Drawer **********/
   const [visibleDrawer, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    console.log("drawer opened")
    setDrawerVisible(true);
  };

  const onClose = () => {
    console.log("drawer Closed")
    setDrawerVisible(false);
  };
  
  /**************Model *******/
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <>
      <li className="cards__item">
    <Link className="cards__item__link" to={props.path} onClick={showModal}  >
        <figure  style={{transform: "scale(1.1)"}}  className="cards__item__pic-wrap" data-category={props.label}>
            <img className="cards__item__img"
            src={props.src} 
           // alt="medicament" 
            />
        </figure>
       <div className="cards__item__info" >
           <h5 className="cards__item__text"> {props.title}</h5>
       </div>
    </Link>
   
    <Modal className="modal" title="Annonce de offre gratuit/vente" width={970} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div >
        <center> <h2>  {props.title}</h2></center>
           <center><div style={{backgroundColor:"#f0f0f5",borderRadius:"5px",height:"400px",paddingTop:"20px"}}> <Slideshow
        interval={3000}
        images={[
        props.src,
        './assets/images/front.jpg',
        './assets/images/pic1.jpg',
       ]}
/></div></center> <br/>
              <div style={{  display:"inline-block", flexDirection:"row", position:"relative"}} >
               <div style={{marginLeft:"50px", display:"inline-block", flexDirection:"row", position:"relative"}}><center><h3><b><TagTwoTone twoToneColor="#52c41a"/> {props.moffre}</b></h3></center></div>
               <div style={{marginLeft:"90px", display:"inline-block", flexDirection:"row", position:"relative"}}><center><h3> <b>  <EnvironmentTwoTone twoToneColor="#52c41a" />{props.lieu}</b></h3></center></div>
               <div style={{marginLeft:"90px", display:"inline-block", flexDirection:"row", position:"relative"}}><center><h3> <b><Button style={{textAlign:"center",width:"120px",borderColor:"#52c41a",borderRadius:"5px",color:"black",backgroundColor:"#e6ffe6"}} type="primary" onClick={showDrawer}> <b>Chat</b> </Button></b></h3></center></div>
              <div style={{marginLeft:"90px", display:"inline-block", flexDirection:"row", position:"relative"}}> <center><Popover content="Ajoutez cette publication aux favoris"  trigger="hover"> <LikeButton type="primary"/> </Popover></center></div>
               <br/><br/>
               <hr/>
               <br/>
               
               <b style={{fontSize:"17px"}}>Description</b><p style={{color:"grey"}}> publiée le : 30/04/2021</p> <p>{props.desc} </p>
               <br/>
               <hr/>
               <br/>
              <center><AnnonceComment /></center>
             
              <center><ShareButtons/></center>
              <div style={{marginLeft:"730px" ,display:"inline-flex",flexDirection:"row"}}><Popconfirm title="êtes-vous sûr de vouloir supprimer cette annonce ?" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                <a  href="#">supprimer</a>
              </Popconfirm>
               <Popover
               
                  title="Reclamation Annonce"
                  trigger="click"
                  content={<> <Form>
                                <Form.Item name="reclamation">
                               <Input  placeholder="pourquoi Reclamez-vous cette annonce?"  onChange={(event)=>{
                              setReclamation(event.target.value)
                                }}/> 
                                </Form.Item>
                               <center className="Buttons" >
                                <Button type="primary" htmlType="submit" onClick={handleValidReclamation}>Envoyer</Button> 
                                <Button type="primary" htmlType="reset" onClick={handleResetReclamation}>Annuler</Button>
                              </center>
                            </Form> </>}
                  visibleClick={visibleClick}
                  onVisibleChangeClick={handleVisibleChange}
        
                > <a href="#">Reclamer</a></Popover>
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
         <div style={{display:"inline-flex", flexDirection:"row",marginTop:"20px"}} >
         <p style={{marginLeft:"5px",marginTop:"10px"}}><b>Annonce Concernée :</b><img style={{width:"60px",height:"60px",marginLeft:"20px"}} src={props.src}/></p>
        <p style={{ marginLeft:"150px",marginTop:"25px"}}><b>Contact :</b> <b>{props.username}</b> </p>
        </div>
        <br/><br/>
        <hr/>
        <br/>
         <div>
          <center>
          <Form>
             <Form.Item name="message" label="Veuillez écrire votre message ici:">
            <TextArea rows={4} style={{width:"450px",height:"100px",marginTop:"20px"}}  onChange={(event)=>{
        setMessage(event.target.value)
        }}/>
            </Form.Item> 
            <Alert
            style={{width:"400px",marginBottom:"10px"}}
              message="Information"
              description=" Si vous demandez un médicament ,Veuillez montrer Votre ordonnance médicale"
              type="info"
             showIcon
           />
            <Form.Item>
              <MyUpload />
            </Form.Item>
            <Form.Item style={{marginLeft:"20px"}}>
                <Button type="primary" htmlType="submit" onClick={handleSubmitMessage}  >
                  Envoyer
               </Button>
               <Button style={{marginLeft:"20px"}} type="primary" htmlType="reset" onClick={handleresetMessage}  >
                  Annuler 
              </Button>
            </Form.Item>
          </Form>
          </center> 
        </div>  
      </Drawer>

    
    </li>
</>
           )
           }

export default AnnonceItem;
