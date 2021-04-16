import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {
  Form,
  Select,
  Input,
  Radio,
  Button,
  Upload,
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const Demo = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="container">
    <Form 
      style={{marginTop:"10px"}}
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
          <Form.Item 
        name={['produit', 'titre']}
        label="Titre"
        hasFeedback
        rules={[
          {
            required: true,
            message:"veuillez preciser le titre "
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['produit', 'Description']} label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="select2"
        label="Categorie"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez Selectionnez la Categorie',
          },
        ]}
      >
        <Select placeholder="Selectionnez la Categorie ">
          <Option value="Medicament">Medicament</Option>
          <Option value="Mobilier Medicale">Mobilier Medicale</Option>
          <Option value="Protection">Protection</Option>
        </Select>
    </Form.Item>
      
      <Form.Item
        name="select"
        label="Gouvernorat"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selectionnez votre Region',
          },
        ]}
      >
        <Select placeholder="Selectionnez votre gouvernorat ">
          <Option value="Ariana">Ariana</Option>
          <Option value="Beja">Beja</Option>
          <Option value="Ben Arous">Ben Arous</Option>
          <Option value="Bizerte">Bizerte</Option>
          <Option value="Gabes">Gabes</Option>
          <Option value="Gafsa">Gafsa</Option>
          <Option value="Jendouba">Jendouba</Option>
          <Option value="Kairouan">Kairouan</Option>
          <Option value="Kebili">Kebili</Option>
          <Option value="Kasserine">Kasserine</Option>
          <Option value="La Manouba">La Manouba</Option>
          <Option value="le Kef ">le Kef</Option>
          <Option value="Mahdia">Mahdia</Option>
          <Option value="Medenine">Medenine</Option>
          <Option value="Monatsir">Monatsir</Option>
          <Option value="Nabeul">Nabeul</Option>
          <Option value="Sfax">Sfax</Option>
          <Option value="Sidi Bouzid">Sidi Bouzid</Option>
          <Option value="Siliana">Siliana</Option>
          <Option value="Sousse">Sousse</Option>
          <Option value="Tataouine">Tataouine</Option>
          <Option value="Tozeur">Tozeur</Option>
          <Option value="Tunis">Tunis</Option>
          <Option value="Zaghouan">Zaghouan</Option>
        </Select>
      </Form.Item>



      <Form.Item  rules={[
          {
            required: true,
            message: 'Selectionnez votre Region',
          },
        ]}
      name="radio-group" label="mode :">
        <Radio.Group>
          <Radio value="a">Offre Volontaire</Radio>
          <Radio value="b">prix significatif</Radio>
        </Radio.Group>
      </Form.Item>


     

      
      <Form.Item label="Dragger"  rules={[
          {
            required: true
          },
        ]}>
        <Form.Item rules={[
          {
            required: true,
            message: 'Selectionnez des images',
          },
        ]} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">glisser et deposer</p>
            <p className="ant-upload-hint">Supporte une ou plusieurs images</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Publier 
        </Button>
      </Form.Item>
    </Form>

    </div>
  );
};

export default Demo ;

