import { BackTop } from 'antd';
import React from 'react';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};
function  ScrollUp(){
    return (
  <div style={{ height: '600vh', padding: 8 }}>
    <BackTop>
      <div style={style}>Up</div>
    </BackTop>,
    mountNode,
  </div>
)
    }
export default ScrollUp