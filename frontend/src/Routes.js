// routes.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mainpart from './Components/Dashboard/Mainpart';
import DetailPage from './Components/Pages/DetailPage';
import ProjectsData from './Components/Data/ProjectsData';
import AssetsData from './Components/Data/AssetsData';
import ServicesData from './Components/Data/ServicesData';

const RoutesConfig = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mainpart />} />
      <Route path="/projects/:id" element={<DetailPage data={ProjectsData} />} />
      <Route path="/assets/:id" element={<DetailPage data={AssetsData} />} />
      <Route path="/services/:id" element={<DetailPage data={ServicesData} />} />
    </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
