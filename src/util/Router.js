import React from 'react'
import SignUp from '../pages/SignUp';
import Userprofile from '../pages/userprofile';
import AboutUs from '../pages/aboutUs';
import SignIn from '../pages/SignIn';
import PublierAnnonce from '../pages/PublierAnnonce';
import Sidebar from '../components/NavBar/SideBar2';
import { BrowserRouter as Routers, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProductList from '../pages/ProducList';
import Details from '../pages/Annonce';
export default function Router() {
    return (
         <Routers>
         <Sidebar/>
        <Switch>
         <Route path="/" exact component={Home} />
          <Route path='/connexion' component={SignIn} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/inscription' component={SignUp} />
          <Route path='/Profile' component={Userprofile} />
          <Route path='/publierannonce' component={PublierAnnonce} />
          <Route path='/details' component={Details} />
          <Route path='/productlist' component={ProductList} />
        </Switch>
        </Routers>
    )
}

//{ localStorage.getItem("UserType")==="uv" && (<Route path="/" component={Home} />) }