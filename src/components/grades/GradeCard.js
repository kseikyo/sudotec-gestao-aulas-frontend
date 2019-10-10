import React from 'react';

function GradeCard({grade}) {
  return (
    <div className="grade-card">
        <div className="grade-name">{grade.name}</div>
        <div className="grade-course">{grade.course.name}</div>
        <div className="expand">
          <div className="d-flex">
            <div>
              <span className="label">Período</span>
              <span className="grade-info d-block">{grade.shift}</span>
            </div>
            <div className='ml-auto'>
              <span className="label">Professor</span>
              <span className="grade-info d-block">{grade.teacher.name}</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="label">Data de início</span>
            <span className="grade-info d-block">{grade.initial_date}</span>
          </div>
        </div>
    </div>
  );
}

export default GradeCard;