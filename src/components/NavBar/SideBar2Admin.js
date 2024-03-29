import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData2Admin';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import 'antd/dist/antd.css';
import { Input } from 'antd';

import ButtonLogOut from "../Button/ButtonLogOut";
import { AuthContext } from '../../Context/AuthContext';


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
  width: 300px;
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
  const [button, setButton] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const authContext = useContext(AuthContext);
  let loggedIn = false;
  if (authContext.auth.id) {
    loggedIn = true;
  }
  console.log(loggedIn)
  async function handleLogOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('token')
    localStorage.removeItem('nom');
    localStorage.removeItem('role')
    window.location.href = "http://localhost:3000/";
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    }
    else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <ul style={{ display: "inline-block" }}>
            {loggedIn === true && (<>
              <li> {button && <ButtonLogOut style={{ marginRight: "300px" }} buttonStyle='btn--outline' onClick={handleLogOut} > Déconnexion </ButtonLogOut>}</li>
            </>)}
            {/* <li> <Link to="#" ><Avatar size="large" icon={<UserOutlined />} style={{
              color: '#2eb82e',
              backgroundColor: " #c2f0c2",
              position: "absolute",
              right: "20px",
              top: "20px",
            }}
            >

            </Avatar> </Link></li> */}
          </ul>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Link to="/admin/Accueil"> <span className="EmedTn"> <b>VmedicTn</b> <img style={{ width: "90px", height: "90px", paddingRight: "40px" }} src="../logo.png" /></span></Link>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <span className="EmedTn"> <b>VmedicTn</b></span>
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