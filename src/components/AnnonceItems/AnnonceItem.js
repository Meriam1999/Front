
import {Link} from 'react-router-dom';
import Slideshow from '../SlidesPubpictures/index';
import React, { useState } from "react";
import ShareButtons from '../Button/ShareButton';
import { Card } from 'antd';
import LikeButton from "../Button/LikeButton";
import './AnnonceItem.css';
import { Modal,Comment, Avatar, Form, Button, List, Input, Popover } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './index.css';
import { TagTwoTone, EnvironmentTwoTone } from '@ant-design/icons';

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
}}

const AnnonceItem = (props) => {
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

    <Modal className="modal" title={props.username} width={970} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
               <div style={{marginLeft:"90px", display:"inline-block", flexDirection:"row", position:"relative"}}><center><h3> <b><Button style={{textAlign:"center",width:"120px",borderColor:"#52c41a",borderRadius:"5px",color:"black",backgroundColor:"transparent"}}type="primary" ghost onClick={handleCancel}> <b>Chat</b> </Button></b></h3></center></div>
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
           </div>
        </div>
    </Modal>
    
    </li>
</>
           )
           }

export default AnnonceItem;
