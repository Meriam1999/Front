import React from 'react';
import 'antd/dist/antd.css';
import PicturesWall from '../Uploadpic';
import { Form, Input, Button,Modal,Space,  Select } from 'antd';

const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  function success() {
    Modal.success({
      content: 'Votre annonce de recherche est publiée',
    });
  }
function Pubrecherhce(){  
    return (
        <>
        <div >
           <br/> 
         <h2>
           <b>Que Cherchez Vous ?</b> 
        </h2>
        <br/>

        <Form style={{paddingBottom:"7px" , marginBottom:"20px"}}>

        <Form.Item name="titre" label="Titre" style={{width:"400px"}} required>
        <Input />
        </Form.Item>

        <Form.Item name={['produit', 'Description2']} label="Déscription"  style={{width:"600px"}} required>
        <Input.TextArea maxLength="400"/>
      </Form.Item>

      <Form.Item
        name="select"
        label="Gouvernorat"
        hasFeedback
        style={{width:"500px"}}
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

        <Form.Item label="Images" style={{width:"300px"}}rules={[
          {
            required:false,
            message: 'veuillez sélectionner une image',
          },
        ]} name="dragger" valuePropName="fileList" getValueFromEvent={normFile} >
            <PicturesWall />
        </Form.Item>

      


       <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" style={{marginRight:"330px",width:"104px",paddingRight:"30px"}} onClick={success} >
          Envoyer
        </Button>
      </Form.Item>

        </Form>
        </div>
        </>
    );
}
export default Pubrecherhce;

