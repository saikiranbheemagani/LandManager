import React from 'react';
import Card from './Card';
import { ProjectsData } from '../Data/ProjectsData';
import { AssetsData } from '../Data/AssetsData';
import { ServicesData } from '../Data/ServicesData';

function Mainpart () {
  return (
    <div className="Mainpart">
      <div className="row">
        <h2>Projects</h2>
        <div className="card-row">
        {ProjectsData.map((project) => (
          <Card key={project.id} title={project.title} description={project.description} link={`/projects/${project.id}`}/>
        ))}
        </div>
      </div>
      <div className="row">
        <h2>Assets</h2>
        <div className="card-row">
        {AssetsData.map((asset) => (
          <Card key={asset.id} title={asset.title} description={asset.description}  link={`/assets/${asset.id}`}/>
        ))}
        </div>
      </div>
      <div className="row">
        <h2>Services</h2>
        <div className="card-row">
        {ServicesData.map((service) => (
          <Card key={service.id} title={service.title} description={service.description}  link={`/services/${service.id}`} />
        ))}
        </div>
      </div>
  </div>
  );
};

export default Mainpart;
