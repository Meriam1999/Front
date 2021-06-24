import React from 'react';
import './likeButton.css';
import { Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';

class LikeButton extends React.Component {
  state = {
    liked: false
  };

  toggleLike = (state) => {
    this.setState({
      liked: !this.state.liked
    })
  }


  render() {
    const changeColour = this.state.liked ? "red" : "grey"
    return (
      <Button style={{ borderColor: "#52c41a", backgroundColor: "#e6ffe6", borderRadius: "15px" }} className="likeBtn" onClick={this.toggleLike}>
        <HeartFilled style={{ fontSize: "14px", color: changeColour, marginLeft: "4px" }} />
      </Button>
    );
  }
}

export default LikeButton;