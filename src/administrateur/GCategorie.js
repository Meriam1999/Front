import React,{useState} from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import './style.css'
import { Table, Tag, Space ,Input,Button,InputNumber, Popconfirm, Form, Typography} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";
const originData =  [{
                      _id:'',
                      nom:'',
                      description:'',
                      
                }]


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

        axios.get('/categorie/afficher')
            .then(res => {
                this.setState({ data: res.data });
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
          

  const edit = (record) => {
    form.setFieldsValue({
      nom:'',
      description:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'nom catégorie ',
      dataIndex: 'nom',
      accessor:'nom',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      accessor:'description',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Enregistrer
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cannuler</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Modifier
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'nom' ? 'description' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
     <Sidebar/>
           
            <TypeWriterEffect
                    textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px"  }}
                    startDelay={100}
                    cursorColor="black"
                    text="Gestions des catégories"
                    typeSpeed={100}
                />
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    <Footer/>
  </>
  );
};


export default EditableTable;

        