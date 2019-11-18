import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

function CourseCard({ course }) {
  const image_style = {
    width: '8rem',
    height: '6rem',
  };

  return (
    <Link className="text-decoration-none" to={`/cursos/${course.id}`}>
      <div className="project-card">
        <Image style={image_style} src={course.image} rounded />
        <div>
          <span className="project-name">{course.name}</span>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;