import React from 'react';
import './App.css';
import Routers from './util/Router';
import axios from "axios";
import { AuthContext, AuthProvider } from './Context/AuthContext';

axios.defaults.withCredentials = true;

function App() {
  return (
      <Routers />
  );
}

function AppWithStore(){
  return(
  <AuthProvider>
    <App/>
  </AuthProvider>
  )
 
}
export default AppWithStore;
