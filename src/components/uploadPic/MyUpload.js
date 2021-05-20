import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MyUpload =() =>{
	return (
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Telecharger image</Button>
    </Upload>
  </Space>)
 }
 export default MyUpload;