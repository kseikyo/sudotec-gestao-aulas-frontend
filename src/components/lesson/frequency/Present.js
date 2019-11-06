import React from 'react';

function Present({disabled = false, onClick, ...props}) {
  return (
    <button onClick={onClick} className={`btn frequency f-present ${disabled ? 'disabled' : ''}`}>✔</button>
  );
}

export default Present;