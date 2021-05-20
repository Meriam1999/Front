const doLogin = (Identifiant) => {
    localStorage.setItem("Identifiant", Identifiant);
    localStorage.setItem("isLoggedIn", true);
  };
  
  const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
  };
  
  const handleLogout = (props) => {
    localStorage.removeItem("Identifiant");
    localStorage.removeItem("isLoggedIn");
    props.history.push("/connexion");
  };
  
  export default {
    doLogin,
    isLoggedIn,
    handleLogout
  };