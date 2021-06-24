import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { useHistory } from "react-router-dom";

import { SidebarData, } from './SidebarData2';
import SubMenu from './SubMenu';
import { WechatOutlined, BellFilled, UserOutlined } from '@ant-design/icons';
import { IconContext } from 'react-icons/lib';
import { Button } from '../Button/Button';
import { Button2 } from '../Button/Button2';
import 'antd/dist/antd.css';
import { Input, Avatar, Badge } from 'antd';
import '../Button/Button.css';
import './Navbar.css';
import AnnonceItem from "../AnnonceItems/AnnonceItem";
import ButtonLogOut from "../Button/ButtonLogOut";
import { AuthContext, AuthProvider } from '../../Context/AuthContext';
// import Search from "../SearchBar/SearchBar";

import axios from 'axios'

const Nav = styled.div`
  background:  #0086b3;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 6px 5px #0086b0;
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
  box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
const Sidebar = () => {

  /***************Partie Recherche *********/
  const { Search } = Input;
  const history = useHistory();

  const [data, setData] = useState([])
  const routeChange = () => {

    history.push('/recherche');
  }
  const [keyword, setKeyword] = useState("")
  const authContext = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [annonceListDefault, setAnnonceListDefault] = useState();
  const [annonceList, setAnnonceList] = useState();

  const fetchData = async () => {
    return axios.get('http://localhost:4000/annonce/afficher')
      .then(res => {
        setAnnonceListDefault(res.data);
        setAnnonceList(res.data)
        console.log(res.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const updateInput = async () => {
    const filtered = annonceListDefault.filter(annonce => {
      return annonce.Titre.toLowerCase().includes(keyword.toLowerCase())
    })
    setInput(keyword);
    setAnnonceList(filtered);

    authContext.Recherche(annonceList)
    console.log("context", authContext.recherche)
  }

  useEffect(() => { fetchData() }, []);


  /******Partie authentification *******/

  let loggedIn = false;
  if (authContext.auth.id) {
    loggedIn = true;
  }
  console.log(loggedIn)
  // return loggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;


  /******************** */
  const [sidebar, setSidebar] = useState(false);
  const [button, setButton] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  const { logout } = false
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
            {loggedIn === false && (<> <li>{button && <Button buttonStyle='btn--outline'> Connectez-vous </Button>}</li>
            </>)}

            <li>{button && <Button2 buttonStyle='btn--outline'> Publier une Annonce </Button2>}</li>

            {loggedIn === true && (<>
              <li> {button && <ButtonLogOut buttonStyle='btn--outline' onClick={handleLogOut} > Déconnexion </ButtonLogOut>}</li>
              <li> <Link to="/Chat"> <WechatOutlined className="Message" /> </Link></li>
              <li> <Link to="/"><BellFilled className="Message1" dot /></Link></li>
              <li> <Link
                to={{
                  pathname: `/profile/${authContext.auth.id}`
                }}
              ><Avatar className="Avatar" icon={<UserOutlined />} /></Link> </li>
            </>)}

            <li>   <Search className="searchBar"

              onSearch={routeChange}
              key="random1"
              placeholder="Que cherchez-vous?"
              value={keyword}
              onChange={(event) => {
                updateInput();
                setKeyword(event.target.value);
                console.log(keyword)

              }}
              /*onSearch={handleSearch}*/
              style={{ width: "240px", borderRadius: "4px" }} /></li>
          </ul>

          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <Link to="/"> <span className="EmedTn"> <b>VmedicTn</b> <img style={{ width: "90px", height: "90px", paddingRight: "40px" }} src="../logo.png" /></span></Link>

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