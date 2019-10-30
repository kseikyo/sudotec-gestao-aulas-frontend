import React from 'react';

function Justified({disabled, onclick, ...props}) {
  return (
    <button onClick={onclick} className={`btn frequency f-justified has-modal ${disabled ? 'disabled' : ''}`}>J</button>
  );
}

export default Justified;