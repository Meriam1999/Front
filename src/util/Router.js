import React from 'react';

import Userprofile from '../pages/userprofile';
import Chat from '../pages/Chat/Chat2';
import AboutUs from '../pages/aboutUs';
import Connexion from '../pages/Connexion';
import Inscri from '../pages/Inscri';
import PublierAnnonce from '../pages/PublierAnnonce';
import AdminHomePage from '../administrateur/homepage';
import { BrowserRouter as Routers, Switch, Route } from 'react-router-dom';
import Gexpert from '../administrateur/GExpert';
import ExpertHomePage from '../Expert/Homepage';
import Guser from'../administrateur/GUser';
import GReclamation from '../administrateur/GReclamation';
import { Redirect } from 'react-router';
import ProductList from '../pages/ProducList';
import Gordonnances from '../Expert/GOrdonnances';
import GannoncesMedic from '../Expert/GAnnoncesMedicament';
import Gannoncesautre from '../Expert/GAnnoncesAutres';
import GannoncesMobilierMedciale from '../Expert/GAnnoncesMobilier';
import GannoncesProtection from '../Expert/GAnnoncesProtection';
import GannoncesSoin from '../Expert/GAnnoncesSoin';
import Favoris from '../pages/Favoris';
import HomePageV from '../pages/Sous-pages/AnnonceVente';
import HomePageR from '../pages/Sous-pages/AnnonceRecherche';
import modifProfile from '../pages/ModifProfile';
import page404 from '../pages/page404';

export default function Router() {
    return (
         <Routers>
        <Switch>
        {/********internaute et utilisateur *******/}
           <Route path="/" exact component={HomePageV} />
           <Route path="/accueil/VenteRecherche"  component={HomePageR} />
           <Route path='/profil/parametres' component={modifProfile} />
           <Route path='/Chat' component={Chat} />
           <Route path='/connexion' component={Connexion} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/inscription' component={Inscri} />
          <Route path='/profile' component={Userprofile} />
          <Route path='/publierannonce' component={PublierAnnonce} />
          <Route path='/productlist' component={ProductList} />
          <Route path="/favoris"component={Favoris} />
       


          {/****************ADMIN********************* */}
          <Route path="/admin/Acceuil"component={AdminHomePage} />
           <Route path="/admin/GestionsExperts"component={Gexpert} />
          <Route path="/admin/GestionUtilisateur" component={Guser} />
          <Route path="/admin/Reclamations"component={GReclamation} />

          {/*********************Expert************************* */}
          <Route path="/expert/Acceuil"component={ExpertHomePage} />
          <Route path="/expert/GannoncesMedic"component={GannoncesMedic} />
          <Route path="/expert/GannoncesMobilierMedciale"component={GannoncesMobilierMedciale} />
          <Route path="/expert/GannoncesProtection" component={GannoncesProtection} />
          <Route path="/expert/GannoncesSoin"component={GannoncesSoin} />
          <Route path="/expert/GannoncesAutres"component={Gannoncesautre} />
          <Route path="/expert/Gordonnances"component={Gordonnances} />
          
        
         
          <Route path="/404" component={page404} />
                    <Redirect to="/404" />
        </Switch>
        </Routers>
    )
}

//{ localStorage.getItem("UserType")==="uv" && (<Route path="/" component={Home} />) }