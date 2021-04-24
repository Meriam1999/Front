import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';

function page404() {
return (
<>
  <Result
    status="404"
    title="404"
    subTitle="Désolé, la page que vous avez visitée n'existe pas."
    extra={<Link to="/" ><Button type="primary">Retour à la page d'accueil</Button></Link>}
  />

</>
)
};

export default page404;