import React from 'react';
import './App.css';
import Routers from './util/Router';
import axios from "axios";
import { AuthContextProvider } from "./Context/AuthContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Routers />
    </AuthContextProvider>
  );
}

export default App;
