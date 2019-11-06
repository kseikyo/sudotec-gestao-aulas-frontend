import React from 'react';

function Justified({disabled, onClick, ...props}) {
  return (
    <button onClick={onClick} className={`btn frequency f-justified has-modal ${disabled ? 'disabled' : ''}`}>J</button>
  );
}

export default Justified;