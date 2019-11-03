import React from 'react'

function InfoButton(props) {
  return (
    <div className={`info-button ${props.className}`} onClick={props.onClick}>i</div>
  );
}

export default InfoButton;