import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Card } from 'antd';
import AnnonceItem from '../AnnonceItems/AnnonceItem';
const Cardpub =() =>{

return (
  <div className="site-card-border-less-wrapper">
    <Card title="Card title" bordered={false} style={{ width: 300 }}>
    </Card>
  </div>
);
}

export default Cardpub;