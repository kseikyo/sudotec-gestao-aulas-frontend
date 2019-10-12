import React from 'react'

function Input({label, type, ...rest}) {
  return (
    <div className="form-group">
      <input type={type || 'text'} {...rest} className="form-control"></input>
      <label className="form-label">{label}</label>
    </div>
  );
}

export default Input;