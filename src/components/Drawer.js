
import React, { useState } from "react";
import {Drawer } from 'antd';
import AnnonceItem from '../components/AnnonceItems/AnnonceItem';
import 'antd/dist/antd.css';


class Drawerr extends React.Component {
    state = { visible: false, placement: 'bottom' };

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    onChange = e => {
      this.setState({
        placement: e.target.value,
      });
    };
    render() {
      const { placement, visible } = this.state;
      return (
        <>  
          <Drawer
            title="Chat"
            placement="bottom"
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
            <p>Chat  </p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </>
      );
    }
  }

 export default Drawerr