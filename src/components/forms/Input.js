import React from 'react'

function Input({label, defaultValue, type = 'text', onChange, ...rest}) {
  return (
    <div className="form-group">
      <input onChange={onChange} type={type || 'text'} defaultValue={defaultValue} {...rest} className="form-control"></input>
      <label className="form-label">{label}</label>
    </div>
  );
}

export default Input;