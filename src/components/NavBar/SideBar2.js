import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData2';
import SubMenu from './SubMenu';
import { MessageTwoTone  } from '@ant-design/icons';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import { IconContext } from 'react-icons/lib';
import { Button } from '../Button/Button';
import {Button2} from '../Button/Button2';
import 'antd/dist/antd.css';
import { Input } from 'antd';


import '../Button/Button.css';
import './Navbar.css';

const Nav = styled.div`
  background:  #0086b3;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 3px 3px 5px gray;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background:  #0086b3;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  box-shadow: 3px 3px 5px gray;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const { Search } = Input;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [button,setButton]= useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  const isLogin=localStorage.getItem("user")==="isLogin";
  const showButton =() => {
    if (window.innerWidth <=960){
        setButton(false);
        }
  else{
      setButton(true);
  }
    };
  
    window.addEventListener('resize',showButton);
    const { Search } = Input;
    const onSearch = value => console.log(value);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <ul style={{display:"inline-block"}}>
           <li>{button && <Button /*onClick={()=>{setButton(false)}}*/ buttonStyle='btn--outline'> Connectez-vous </Button>}</li>
           <li>{button && <Button2  /*onClick={()=>{setButton(false)}}*/ buttonStyle='btn--outline'> Publier une Annonce </Button2>}</li>
           <li> <Link to="/Chat"><MessageTwoTone className="Message" /></Link></li>
           <li><Search className="searchBar"placeholder="input search text" onSearch={onSearch} style={{ width:"240px",borderRadius:"4px" }} /> </li>
         </ul>

          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>

          <Link to="/"><span className="EmedTn"> <b>VmedicTn</b> <img style={{width:"90px",height:"90px",paddingRight:"40px"}} src="./logo.png" /></span></Link>
       
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;