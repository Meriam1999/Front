import React, { useState, useContext } from 'react'
import { Upload, Modal, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import './style.css';
import { AuthContext } from '../../Context/AuthContext';





function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
function Uploadpiccc(props) {
    const authContext = useContext(AuthContext);
    const [state, setState] = useState({ previewVisible: false, previewImage: "", fileList: [] })
    const handleCancel = () => setState({ previewVisible: false });

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    const handleChange = ({ fileList }) => {
        if (props.onChange) {
            props.onChange(fileList)
        }
        setState({ fileList });

        authContext.File({ fileList })
    };

    const { previewVisible, previewImage, fileList } = state;
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Ajouter Images</div>
        </div>
    );
    return (
        <div>
            <div>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    onPreview={handlePreview}
                    beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>

                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </div>
        </div>
    )
}

export default Uploadpiccc
