import React, { useContext } from 'react';

import ProfileUser from '../pages/userprofile';
import Chat from '../pages/Chat/Chat2';
import AboutUs from '../pages/aboutUs';
import Connexion from '../pages/Connexion';
import Inscri from '../pages/Inscri';
import PublierAnnonce from '../pages/PublierAnnonce';
import AdminHomePage from '../administrateur/homepage';
import { BrowserRouter as Routers, Switch, Route,Redirect  } from 'react-router-dom';
import Gexpert from '../administrateur/GExpert';
import ExpertHomePage from '../Expert/Homepage';
import Guser from '../administrateur/GUser';
import Gcatego from '../administrateur/GCategorie';
import GReclamation from '../administrateur/GReclamation';

import ProductList from '../pages/ProducList';
import Gordonnances from '../Expert/GOrdonnances';
import GannoncesMedic from '../Expert/GAnnoncesMedicament';
import Gannoncesautre from '../Expert/GAnnoncesAutres';
import Gproduit from "../Expert/GProduit";
import GannoncesMobilierMedciale from '../Expert/GAnnoncesMobilier';
import GannoncesProtection from '../Expert/GAnnoncesProtection';
import GannoncesSoin from '../Expert/GAnnoncesSoin';
import Favoris from '../pages/Favoris';
import HomePageV from '../pages/Sous-pages/AnnonceVente';
import HomePageR from '../pages/Sous-pages/AnnonceRecherche';
import modifProfile from '../pages/ModifProfile';
import page404 from '../pages/page404';
import { AuthContext } from '../Context/AuthContext';

export default function Router() {
 const authContext=useContext(AuthContext);
  

    return (
        <Routers>
            <Switch>
               

            {authContext.auth.id?
                
            <Route path="/" exact component={HomePageV} />:
            <Route path="/" exact component={Connexion} />
            }
       
   
                <Route path='/connexion' component={Connexion} />:
      

       
              
                <Route path='/inscription' component={Inscri} />
             

        <Route  path='/profile/' component={ProfileUser} />:
   
        

              
         <Route path="/accueil/VenteRecherche" component={HomePageR} />
           
      
                  
         
               
                <Route path='/profil/parametres' component={modifProfile} />
                <Route path='/Chat' component={Chat} />
                <Route path='/publierannonce' component={PublierAnnonce} />

                <Route path="/favoris" component={Favoris} />
                {/* </>
                } */}



                <Route path='/aboutus' component={AboutUs} />
                <Route path='/productlist' component={ProductList} />

                {/****************ADMIN********************* */}
                <Route path="/admin/Acceuil" component={AdminHomePage} />
                <Route path="/admin/GestionsExperts" component={Gexpert} />
                <Route path="/admin/GestionUtilisateur" component={Guser} />
                <Route path="/admin/Reclamations" component={GReclamation} />
                <Route path="/admin/Gcategorie" component={Gcatego} />

                {/*********************Expert************************* */}
                <Route path="/expert/Acceuil" component={ExpertHomePage} />
                <Route path="/expert/GannoncesMedic" component={GannoncesMedic} />
                <Route path="/expert/GannoncesMobilierMedciale" component={GannoncesMobilierMedciale} />
                <Route path="/expert/GannoncesProtection" component={GannoncesProtection} />
                <Route path="/expert/GannoncesSoin" component={GannoncesSoin} />
                <Route path="/expert/GannoncesAutres" component={Gannoncesautre} />
                <Route path="/expert/Gordonnances" component={Gordonnances} />
                <Route path="/expert/GProduits" component={Gproduit} />
                <Route path="/404" component={page404} />
                <Redirect to="/404" />
            </Switch>
        </Routers>
    )
}

//{ localStorage.getItem("UserType")==="uv" && (<Route path="/" component={Home} />) }