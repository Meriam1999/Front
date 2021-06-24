import React, { useContext } from 'react';
import PageRecherche from "../pages/PageRecherche";
import ProfileUser from '../pages/userprofile';
import Chat from '../pages/Chat/Chat2';
import AboutUs from '../pages/aboutUs';
import Connexion from '../pages/Connexion';
import Inscri from '../pages/Inscri';
import PublierAnnonce from '../pages/PublierAnnonce';
import AdminHomePage from '../administrateur/homepage';
import { BrowserRouter as Routers, Switch, Route, Redirect } from 'react-router-dom';
import Gexpert from '../administrateur/GExpert';
import ExpertHomePage from '../Expert/Homepage';
import Guser from '../administrateur/GUser';
import AnnonceItem from "../components/AnnonceItems/AnnonceItem";
import GMobilierMedicale from "../pages/Sous-pages/ProductListMobilier";
import Gcatego from '../administrateur/GCategorie';
import GReclamation from '../administrateur/GReclamation';
import GListSoin from "../pages/Sous-pages/ProductListSoin";
import GListAutres from "../pages/Sous-pages/ProductListAutres";
import GListProtection from "../pages/Sous-pages/ProductListProtection";
import ProductList from '../pages/ProducList';
import Gordonnances from '../Expert/GOrdonnances';
import GannoncesMedic from '../Expert/GAnnoncesMedicament';
import GannoncesMobilierMedciale from '../Expert/GAnnoncesMobilier';
import Favoris from '../pages/Favoris';
import HomePageV from '../pages/Sous-pages/AnnonceVente';
import HomePageR from '../pages/Sous-pages/AnnonceRecherche';
import modifProfile from '../pages/ModifProfile';
import page404 from '../pages/page404';
import { AuthContext } from '../Context/AuthContext';

export default function Router() {
    const authContext = useContext(AuthContext);
    let loggedIn = false;
    if (authContext.auth.id) {
        loggedIn = true;
    }
    return (
        <Routers>
            <Switch>
                {/* <Route path="/annonce/:id" component={AnnonceItem} /> */}
                <Route path="/" exact component={HomePageV} />
                <Route path="/annonce/:id" component={HomePageV} />
                <Route path="/annonceRecherche/annonce/:id" component={HomePageR} />
                <Route path="/annonceRecherche/annonce" component={HomePageR} />
                <Route path="/recherche" component={PageRecherche} />
                <Route path='/MobilerMedicale' component={GMobilierMedicale} />
                <Route path='/MobilerMedicale/:id' component={GMobilierMedicale} />
                <Route path='/SoinPansement' component={GListSoin} />
                <Route path='/SoinPansement/:id' component={GListSoin} />
                <Route path='/protection' component={GListProtection} />
                <Route path='/protection/:id' component={GListProtection} />
                <Route path='/autres' component={GListAutres} />
                <Route path='/autres/:id' component={GListAutres} />
                <Route path='/aboutus' component={AboutUs} />
                <Route path='/medicament' component={ProductList} />
                <Route path='/medicament/:id' component={ProductList} />
                {/* {loggedIn === true ? */}
                <Route path='/publierannonce' component={PublierAnnonce} />
                <Route path='/connexion' component={Connexion} />


                <Route path='/connexion' component={Connexion} />

                <Route path='/inscription' component={Inscri} />

                <Route path='/profile/:id' component={ProfileUser} />
                <Route path='/profile/:id/:id' component={ProfileUser} />

                <Route path="/accueil/VenteRecherche" component={HomePageR} />






                <Route path='/profil/parametres' component={modifProfile} />
                <Route path='/Chat' component={Chat} />
                {/* <Route path='/publierannonce' component={PublierAnnonce} /> */}

                <Route path="/favoris" component={Favoris} />
                {/* </>
                } */}


                {/****************ADMIN********************* */}
                <Route path="/admin/Accueil" component={AdminHomePage} />
                <Route path="/admin/GestionsExperts" component={Gexpert} />
                <Route path="/admin/GestionUtilisateur" component={Guser} />
                <Route path="/admin/Reclamations" component={GReclamation} />
                <Route path="/admin/Gcategorie" component={Gcatego} />

                {/*********************Expert************************* */}
                <Route path="/expert/Accueil" component={ExpertHomePage} />
                <Route path="/expert/GannoncesMedic" component={GannoncesMedic} />
                <Route path="/expert/GannoncesMobilierMedciale" component={GannoncesMobilierMedciale} />
                {/* <Route path="/expert/GannoncesProtection" component={GannoncesProtection} />
                <Route path="/expert/GannoncesSoin" component={GannoncesSoin} />
                <Route path="/expert/GannoncesAutres" component={Gannoncesautre} /> */}
                <Route path="/expert/Gordonnances" component={Gordonnances} />
                <Route path="/404" component={page404} />
                <Redirect to="/404" />
            </Switch>
        </Routers>
    )
}

//{ localStorage.getItem("UserType")==="uv" && (<Route path="/" component={Home} />) }