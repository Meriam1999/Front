import React from 'react';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router';
import PicturesWall from '../Uploadpic';
import Tags from './Tags/Tagsmedicaments';
import Tags2 from './Tags/TagsmobilierMedicale';
import {
  Form,
  Modal,
  Select,
  DatePicker,
  Space ,
  Input,
  Radio,
  Button,
  Upload,
  InputNumber,
  notification,
  Popover
} from 'antd';

const openNotification = placement => {
  notification.info({
    message: 'Votre publication a été envoyée et est en attente d’approbation par un administrateur.',
    placement,
  });
};

function info() {
  Modal.info({
    title: 'publication reçue',
    content: (
      <div>
        <p>Votre publication a été envoyée et est en attente d’approbation par un administrateur.</p>
      </div>
    ),
    onOk(){<Redirect to="/" />},
  });
}
function onChange(value) {
  console.log('changed', value);
}
const { RangePicker } = DatePicker;
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
    <div style={{paddingTop:"15px",paddingBottom:"20px",marginBottom:"20px"}}className="container">
    <Form 
      style={{marginRight:"100px"}}
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
            message:"veuillez préciser le titre ",
          },
        ]}
      >
        <Input maxLength="40" />
      </Form.Item>

      <Form.Item name={['produit', 'Description']} label="Déscription">
        <Input.TextArea maxLength="400" />
      </Form.Item>

      <Form.Item
        name="select2"
        label="Catégorie"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez Selectionnez la catégorie',
          },
        ]}
      >
        <Select placeholder="Selectionnez la Categorie ">
          <Option value="Médicament">Médicament</Option>
          <Option value="Mobilier Médicale">Mobilier Médicale</Option>
          <Option value="Protection">Protection</Option>
          <Option value='Soin et Pansements'>Soin et Pansements</Option>
          <Option value='Autre'>Autre</Option>
        </Select>
    </Form.Item>
    
    <Form.Item
          style={{marginLeft:"330px"}}
          shouldUpdate={(prevValues, currentValues) => prevValues.select2 !== currentValues.select2}
        >
          {({ getFieldValue }) =>
            getFieldValue('select2') === 'Médicament' ? (
              <Form.Item >
                <center>
              <Form.Item 
                name="date de fabrication"
                label="date F/E"
                rules={[
                  {
                    required: false,
                    message:"la date de fabrication et d'expiration est obligatoire !",
                  },
                ]}
              >
               <Space direction="vertical" >
               <RangePicker  />
               </Space>
              </Form.Item>
              </center>
              <Form.Item  
                name="Dosage"
                label="Dosage"
                rules={[
                  {
                    required: true,
                    message:"Veuillez indiquer la Dosage SVP !",
                  },
                ]}
              >
               <Input />
              </Form.Item>
              <Form.Item
                name="Tags"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
               <Tags />
              </Form.Item>
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item
        noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.select2 !== currentValues.select2}
        >
          {({ getFieldValue }) =>
            getFieldValue('select2') === 'Mobilier Médicale' ? (
              <Form.Item
                name="Tags2"
                label="tags"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
             <Tags2 />
              </Form.Item>
              
            ) : null
          }
        </Form.Item>
      
      <Form.Item
        name="select"
        label="Gouvernorat"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Selectionnez votre Région SVP',
          },
        ]}
      >
        <Select placeholder="Selectionnez votre gouvernorat ">
          <Option value="Ariana">Ariana</Option>
          <Option value="Beja">Béja</Option>
          <Option value="Ben Arous">Ben Arous</Option>
          <Option value="Bizerte">Bizerte</Option>
          <Option value="Gabes">Gabes</Option>
          <Option value="Gafsa">Gafsa</Option>
          <Option value="Jendouba">Jendouba</Option>
          <Option value="Kairouan">Kairouan</Option>
          <Option value="Kebili">Kébili</Option>
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
            message: 'Sellectionnez un mode SVP !',
          },
        ]}

      name="radiogroup" label="mode :" >
        <Radio.Group >
        <Popover content="Vous le Donnez Gratuitement, vous êtes une personne BIENFAISANTE et GÉNÉREUSE " trigger="click">
          <Radio value="a">Offre Volontaire</Radio>
        </Popover>
          <Popover content="Le prix symbolique n'a rien à voir avec la valeur ou la vraie qualité de votre produit, mais avec vous le vendre généreusement à bas prix pour aider les autres " trigger="click">
          <Radio value="prix symbolique">prix symbolique</Radio>
          </Popover>
        </Radio.Group>
      </Form.Item>

      <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.radiogroup !== currentValues.radiogroup}
        >
          {({ getFieldValue }) =>
            getFieldValue('radiogroup') === 'prix symbolique' ? (
              <Form.Item
                name="prix"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
               <InputNumber direction="vertical" style={{marginLeft:"510px"}}
               defaultValue={10}
               formatter={value => `${value} DT`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
               parser={value => value.replace(/\$\s?|(,*)/g, '')}
               onChange={onChange}
            />
               
              </Form.Item>
              
            ) : null
          }
        </Form.Item>


     

      
      <Form.Item label="Image"  rules={[
          {
            required: true
          },
        ]}>
        <Form.Item rules={[
          {
            required: true,
            message: ' veuillez sélectionner une image',
          },
        ]} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <PicturesWall />
          {/* <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{color:"#adebad"}}/>
            </p>
            <p className="ant-upload-text">glisser et déposer des images</p>
           
          </Upload.Dragger> */}
        </Form.Item>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button style={{ marginLeft:"110px"}}type="primary" htmlType="submit" onClick={info}>
          Publier 
        </Button>
        <Button style={{ marginLeft:"110px"}} type="primary" htmlType="reset">
          Annuler 
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Demo ;

