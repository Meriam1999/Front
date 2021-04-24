import React from 'react';
import './likeButton.css';
import {  Button } from 'antd';
class LikeButton extends React.Component {
      state = {
        liked: false
      };
    
    toggleLike= (state)=>{
        this.setState({
            liked:!this.state.liked
        })
    }
    
    
    render() {
        const changeColour = this.state.liked ? "red" : "grey"
      return (
            <Button style={{borderColor: "#52c41a" ,backgroundColor:"#e6ffe6", borderRadius:"15px"}}className="likeBtn" onClick={this.toggleLike}>
                <i className="fas fa-heart fa-lg" style={{color:changeColour}}></i>
            </Button>
      );
    }
  }
  
export default LikeButton;