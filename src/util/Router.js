import React from 'react'
import SignUp from '../pages/SignUp';
import Userprofile from '../pages/userprofile';
import AboutUs from '../pages/aboutUs';
import SignIn from '../pages/SignIn';
import PublierAnnonce from '../pages/PublierAnnonce';
import AdminHomePage from '../administrateur/homepage';
import { BrowserRouter as Routers, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Gexpert from '../administrateur/GExpert';
import Guser from'../administrateur/GUser';
import GReclamation from '../administrateur/GReclamation';
import { Redirect } from 'react-router';
import ProductList from '../pages/ProducList';
import Favoris from '../pages/Favoris';
import page404 from '../pages/page404';
export default function Router() {

    return (
         <Routers>
        <Switch>
           <Route path="/" exact component={Home} />
          <Route path="/favoris"component={Favoris} />
          <Route path="/admin/Acceuil"component={AdminHomePage} />
          <Route path="/admin/GestionsExperts"component={Gexpert} />
          <Route path="/admin/GestionUtilisateur" component={Guser} />
          <Route path="/admin/Reclamations"component={GReclamation} />
          <Route path='/connexion' component={SignIn} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/inscription' component={SignUp} />
          <Route path='/Profile' component={Userprofile} />
          <Route path='/publierannonce' component={PublierAnnonce} />
          <Route path='/productlist' component={ProductList} />
          <Route path="/404" component={page404} />
                    <Redirect to="/404" />
  
        </Switch>
        </Routers>
    )
}

//{ localStorage.getItem("UserType")==="uv" && (<Route path="/" component={Home} />) }