import React from "react";
import { Redirect } from "react-router-dom";
import AboutUs from './pages/aboutUs';
import ProfileUser from './pages/userprofile';
import Home from './pages/Home';

const redirectRoute = [
    {
      path: "/",
      exact: true,
      component: () => <Redirect to='/home' />
    },
    {
        path: "/Profile",
        exact: true,
        component: () => <Redirect to='/profile' />
      },
      {
        path: "/AboutUs",
        exact: true,
        component: () => <Redirect to='/aboutus' />
      }
  ];

  const errorRoute = [
    {
      component: () => <Redirect to="/session/404" />
    }
  ];

  const routes = [
    ...redirectRoute,
    ...errorRoute
  ];

  export default routes;