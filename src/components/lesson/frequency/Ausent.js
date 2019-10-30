import React from 'react';

function Ausent({disabled, onclick, ...props}) {
  return (
    <button onClick={onclick} className={`btn btn-frequency frequency f-ausent ${disabled ? 'disabled' : ''}`}>F</button>
  );
}

export default Ausent;