import React from 'react';

function Present({disabled = false, onclick, ...props}) {
  return (
    <button onClick={onclick} className={`btn frequency f-present ${disabled ? 'disabled' : ''}`}>✔</button>
  );
}

export default Present;