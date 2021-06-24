import React,{useState,useContext,useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Popover,Form,Input,notification} from 'antd';
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios"
const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  profileImage: {
    width: "170px",
    height:"170px",
    borderRadius:"100px"
  },
  content: {
    justifyContent: "right",
    textAlign: "right"
  },
  details: {
    marginTop: "-20px"
  },
  chip: {
    padding: "0 5px",
    margin: "2px 5px"
  },
  about: {
    margin: "10px 0",
    alignItems: "right",
    textAlign: "right"
  },
  container: {
    float:"right",
    marginRight:"2px;",
    textAlign:"center"
  }

}));

export default function Profile(props) {
  const classes = useStyles();
  const [user, setUser] = useState([])
  const authContext = useContext(AuthContext);
  useEffect(() => {
    axios.get('http://localhost:4000/user/afficher')
      .then(res => {
        setUser(res.data);
        console.log(res.data)
      })
      .catch(function (error) {

        console.log(error);
      })
  }, [])

  const [data, setData] = useState([])

   useEffect(() => {
        axios.get('http://localhost:4000/annonce/afficher')
            .then(res => {
                setData(res.data);
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])
      const [visibleClick, setVisibleClick] = useState(false);
      const [reclamation, setReclamation] = useState("");
      const openNotificationsucces = (placement, message) => {
  notification.success({
    message,
    placement,
  });
};
  const validReclamation = () => {
    if (reclamation)
      return true;
    else
      return false;
  }
const handleVisibleChange = () => {
    setVisibleClick(true);
  };
  const handleResetReclamation = () => {
    setReclamation("");
    console.log("Reclamee")
    return true;
  }

  const handleValidReclamation = (event) => {
    event.preventDefault();
    const Rec = {
      IdExpediteur: authContext.auth.id,
      IdAbbonneeReclamee:props.id,
      Expediteur: authContext.auth.nom,
      // Titre_reclamation: titreReclamation,
      Contenu: reclamation
    }
    console.log("id reclamee",Rec.IdAbbonneeReclamee)
    if (validReclamation()) {
      axios.post(`http://localhost:4000/reclamation/ajouter`, Rec)
        .then((res) => {
          openNotificationsucces('bottomRight', 'Votre réclamations envoyée à notre administrateur pour la traiter! ');
          console.log("Reclamation Ok ")
          console.log(res.data)
          console.log(res)
        }).catch((error) => {
          console.log(error.response)
        });
    } else {
      console.log(" Echec Reclamation ")
    }
  }

  let loggedIn = false;
  if (authContext.auth.id) {
    loggedIn = true;
  }

  return (
    <React.Fragment>
      <div  className={classes.container}  style={{height:"auto"}}>
        <img
          className={classes.profileImage}
          alt="Nom et prenom"
           src='/assets/images/anonyme.jpg'
          
        />
        <div style={{marginTop:"10px"}} className={classes.content}>
           {user.map((item,key) =>
        item._id == props.id ?
          <>
          <Typography  component="h1" variant="h4">
            {item.Nom+ ' ' + item.Prenom}
          </Typography>
             </> : null
      )}
          <p style={{color:"grey",marginRight:"75px"}} > 1 publication(s)</p>
          {loggedIn === true  && (authContext.auth.id == props.id)  ? <>
          <Link to='/publierannonce'>  <Button style={{marginTop:"10px"}} to="/publierannonce" variant="outlined" color="primary" fullWidth>
            Publier Annonce
          </Button>
          </Link> 
          <Link to='/favoris'>
          <Button style={{marginTop:"15px"}} variant="outlined" color="primary" fullWidth>
            Voir mes favoris
          </Button>
          </Link>
          <Link to='/profil/parametres'>
          <Button style={{marginTop:"15px"}} variant="outlined" color="primary" fullWidth>
            modifier profile
          </Button>
          </Link>
          </>
          :
           <Popover
                  title="Reclamation Annonce"
                  trigger="click"
                  content={<> <Form>
                    <Form.Item name="reclamation">
                      {/* <Input placeholder="Titre reclamation?" onChange={(event) => {
                        setTitreReclamation(event.target.value)
                      }} /> */}
                      <Input placeholder="pourquoi Reclamez-vous cette Personne?" onChange={(event) => {
                        setReclamation(event.target.value)
                      }} />
                    </Form.Item>
                    <center className="Buttons" >
                      <Button type="primary" htmlType="submit" onClick={handleValidReclamation}>Envoyer</Button>
                      <Button type="primary" htmlType="reset" onClick={handleResetReclamation}>Annuler</Button>
                    </center>
                  </Form> </>}
                  visibleClick={visibleClick}
                  onVisibleChangeClick={handleVisibleChange}
                > 
                <a href="#" style={{marginRight:"60px",marginBottom:"3px"}}>Reclamer abonné</a>
                </Popover>
  }
        </div>
      </div>
    </React.Fragment>
  );
}
