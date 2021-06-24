import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { BarChartOutlined, MedicineBoxOutlined } from '@ant-design/icons';

export const SidebarData = [
  {
    title: 'Accueil',
    path: '/expert/Accueil',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Annonces Médicaments',
    path: '/expert/GannoncesMedic',
    icon: <MedicineBoxOutlined />,

  },
  {
    title: 'Annonces Non-Médicaments',
    path: '/expert/GannoncesMobilierMedciale',
    icon: <MedicineBoxOutlined />,
  },
  // {
  //   title: 'Protection',
  //   path: '/expert/GannoncesProtection',
  //   icon: <AiIcons.AiFillHome />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  // {
  //   title: 'Soin et Pansement ',
  //   path: '/expert/GannoncesSoin',
  //   icon: <AiIcons.AiFillHome />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  // {
  //   title: 'Annonces Autres',
  //   path: '/expert/GannoncesAutres',
  //   icon: <AiIcons.AiFillHome />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  // },
  {
    title: 'Gestion des Ordonnances',
    path: '/expert/Gordonnances',
    icon: <MedicineBoxOutlined />,
  },
];