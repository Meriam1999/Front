import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Upload, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MyUpload = () => {
  const props = {
    beforeUpload: file => {
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`);
      }
      return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
    },
    onChange: info => {
      console.log(info.fileList);
    },
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Télécharger Image (png)</Button>
    </Upload>
  );
};
export default MyUpload;