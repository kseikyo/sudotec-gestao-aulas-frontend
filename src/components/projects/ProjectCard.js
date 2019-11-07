import React from 'react';
import {Link} from 'react-router-dom';
import Image from 'react-bootstrap/Image';

function ProjectCard({project}) {

    return (
    <Link className="text-decoration-none" to={`/projects/${project.id}`}>
      <div className="grade-card">
        <Image src={project.image} rounded />
        <span className="project-name">{project.name}</span>
      </div>
    </Link>
  );
}

export default ProjectCard;