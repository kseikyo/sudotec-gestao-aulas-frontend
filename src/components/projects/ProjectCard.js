import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

function ProjectCard({ project }) {
  const image_style = {
    width: '8rem',
    height: '6rem',
  };

  return (
    <Link className="text-decoration-none" to={`/projects/${project.id}`}>
      <div className="project-card">
        <Image style={image_style} src={project.image} rounded />
        <div>
          <span className="project-name">{project.name}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;