import React from 'react'

function Input({label, defaultValue, type = 'text', ...rest}) {
  return (
    <div className="form-group">
      <input type={type || 'text'} defaultValue={defaultValue} {...rest} className="form-control"></input>
      <label className="form-label">{label}</label>
    </div>
  );
}

export default Input;