import React from 'react';

function Ausent({disabled, onClick, ...props}) {
  return (
    <button onClick={onClick} className={`btn btn-frequency frequency f-ausent ${disabled ? 'disabled' : ''}`}>F</button>
  );
}

export default Ausent;