import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { FaUserAlt } from 'react-icons/fa';
import { FaUserNurse } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import { FaRegAngry } from 'react-icons/fa';


export const SidebarData = [
  {
    title: 'Accueil',
    path: '/admin/Accueil',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Gestion des Experts',
    path: '/admin/GestionsExperts',
    icon: <FaUserNurse />,
  },
  {
    title: 'Gestion des utilisateurs',
    path: '/admin/GestionUtilisateur',
    icon: <FaUserAlt />,
  },
  {
    title: 'Gestion des Catégories',
    path: '/admin/Gcategorie',
    icon: <FaWallet />
  },
  {
    title: 'Gestion des Reclamations',
    path: '/admin/Reclamations',
    icon: <FaRegAngry />
  }
];