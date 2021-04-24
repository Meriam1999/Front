import React from 'react';
import '../App.css';
import Footer from'../components/Footer/Footer';
import Sidebar from '../components/NavBar/SideBar2Admin';
import TypeWriterEffect from 'react-typewriter-effect';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Nom',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Addresse',
    dataIndex: 'addresse',
    key: 'addresse',
  },
  {
    title: 'role',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: [ 'developper'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['developper'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: [''],
  },
];


function GUser() {
  return (
    <>
    <Sidebar/>
    <div style={{height:"700px"}}>
    <TypeWriterEffect
            textStyle={{ fontFamily:"sans-serif", textAlign:"center", fontWeight:"bold",marginTop:"25px" }}
            startDelay={100}
            cursorColor="black"
            text="Gestion Des Utilisateurs"
            typeSpeed={100}
          />
    <Table style={{marginTop:"25px"}} columns={columns} dataSource={data} />
    </div>
    <Footer/>
    </>
  );
}

export default GUser