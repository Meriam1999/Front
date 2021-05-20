
import ReactDOM from 'react-dom';
import ShareButtons from '../Button/ShareButton';
import 'antd/dist/antd.css';
import moment from 'moment';
import LikeButton from "../Button/LikeButton";
import React, { useEffect, useState } from "react";
import './index.css';
import { Card ,Form,Comment,Avatar,Input,List,Drawer,Popover,Alert,Popconfirm} from 'antd';
import { Modal, Button } from 'antd';
import { TagTwoTone, EnvironmentTwoTone,QuestionCircleOutlined } from '@ant-design/icons';
import AnnonceItem from '../AnnonceItems/AnnonceItem';

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
const info1=()=> {
        Modal.success({
          content: (
            <div>
              <p><center>Votre Reclamation est enovyée avec succés</center></p>
            </div>
          )
        });
      }

      
  const info3=()=> {
        Modal.error({
          content: (
            <div>
              <p><center>Veuillez Saisir Votre Reclamation!</center></p>
            </div>
          )
        });
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

       const info4=()=> {
        Modal.error({
          content: (
            <div>
              <p><center>Veuillez Saisir un message !</center></p>
            </div>
          )
        });
      }


const Cardpub =() =>{
  const [visible, setVisible] = useState(false);

   /****************Message **********8*/

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
  <div className="site-card-border-less-wrapper" >
    <div  className="container" >
       <ul style={{paddingTop:"10px"}}>

          <Card  className="cardd"title="nada" bordered={false} extra={<Button onClick={() => setVisible(true)} >Details</Button>} >
             <p><b style={{ color:"green"}} >Titre :</b>antibiotique </p>
            <p><b style={{ color:"green"}} >Description :</b>lsjhkjfkhdsj skdjfhksjdhksd ksjdgfkshdgfks kjsdgfkgdskfg ksdhgfkshdg ksdgfksdgf kdgj fksjg </p>
            <b ><EnvironmentTwoTone twoToneColor="#52c41a" />Monastir</b>
          </Card>
                        <Modal
                      title="Annonce de Recherche"
                      centered
                      visible={visible}
                      onOk={() => setVisible(false)}
                      onCancel={() => setVisible(false)}
                      width={940}
                    >
                      <div>
                      <center> <h2> Titre</h2></center>
                      <img src='assets/images/medi.jpg'/>
                        <div style={{  display:"inline-block", flexDirection:"row", position:"relative"}} >
                        <div style={{marginLeft:"250px", display:"inline-block", flexDirection:"row", position:"relative"}}><center><h3> <b>  <EnvironmentTwoTone twoToneColor="#52c41a" />Monastir</b></h3></center></div>
                        <div style={{marginLeft:"90px", display:"inline-block", flexDirection:"row", position:"relative"}}><center><h3> <b><Button style={{textAlign:"center",width:"120px",borderColor:"#52c41a",borderRadius:"5px",color:"black",backgroundColor:"transparent"}}type="primary" onClick={showDrawer}> <b>Chat</b> </Button></b></h3></center></div>
                        <div style={{marginLeft:"90px", display:"inline-block", flexDirection:"row", position:"relative"}}> <center><Popover content="Ajoutez cette publication aux favoris"  trigger="hover"> <LikeButton type="primary"/> </Popover></center></div>
                      </div>
                        <hr/>
                           <br/>
                         <b style={{fontSize:"17px"}}>Description</b><p style={{color:"grey"}}> publiée le : 30/04/2021</p> <p>llhlsjvhlsjfvljsfl lsfjhvljsgljfgv </p>
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
                <p style={{marginLeft:"5px",marginTop:"10px"}}><b>Annonce Concernée :</b><img style={{width:"60px",height:"60px",marginLeft:"20px"}} /></p>
                <p style={{ marginLeft:"150px",marginTop:"25px"}}><b>Contact :</b> <b></b> </p>
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


          <Card  className="cardd" title="mariem" bordered={false} extra={<Button onClick={() => setVisible(true)} >Details</Button>}>
            <p><b style={{ color:"green"}} >Titre :</b>antibiotique </p>
            <p><b style={{ color:"green"}} >Description :</b>lsjhkjfkhdsj skdjfhksjdhksd ksjdgfkshdgfks kjsdgfkgdskfg ksdhgfkshdg ksdgfksdgf kdgj fksjg </p>
            <b ><EnvironmentTwoTone twoToneColor="#52c41a" />Monastir</b>
          </Card>
          </ul>
          
          <ul style={{marginTop:"10px"}}>
          <Card  className="cardd" title="mejdi" bordered={false} extra={<Button onClick={() => setVisible(true)} >Details</Button>} >
            <p><b style={{ color:"green"}} >Titre :</b>antibiotique </p>
            <p><b style={{ color:"green"}} >Description :</b>lsjhkjfkhdsj skdjfhksjdhksd ksjdgfkshdgfks kjsdgfkgdskfg ksdhgfkshdg ksdgfksdgf kdgj fksjg </p>
            <b ><EnvironmentTwoTone twoToneColor="#52c41a" />Monastir</b>
          </Card>
          <Card  className="cardd" title="mehdi" bordered={false} extra={<Button onClick={() => setVisible(true)} >Details</Button>} >
            <p><b style={{ color:"green"}} >Titre :</b>antibiotique </p>
            <p><b style={{ color:"green"}} >Description :</b>lsjhkjfkhdsj skdjfhksjdhksd ksjdgfkshdgfks kjsdgfkgdskfg ksdhgfkshdg ksdgfksdgf kdgj fksjg </p>
            <b ><EnvironmentTwoTone twoToneColor="#52c41a" />Monastir</b>
          </Card>
    </ul>
    </div>
  </div>
  
);
}

export default Cardpub;