import React from 'react'

function Input(props) {
  return (
    <div className="form-group">
      <input defaultValue={props.value} className="form-control" type={props.type || 'text'} ref={props.ref}></input>
      <label className="form-label">{props.label}</label>
    </div>
  );
}

export default Input;