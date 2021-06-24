
import { Upload, Modal, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './style.css';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => {
    if (this.props.onChange) {
      this.props.onChange(fileList)
    }
    this.setState({ fileList });
  };

  //  handleChange = ({ fileList }) => this.setState({ fileList }, console.log(fileList));


  // handleSubmit = event => {
  //   event.preventDefault();

  // };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Ajouter Images</div>
      </div>
    );
    return (
      <div>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}