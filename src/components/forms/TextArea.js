import React from 'react'

function TextArea({label, type, ...rest}) {
  return (
    <div className="form-group">
      <textarea className="form-control" type={type || 'text'} {...rest}></textarea>
      <label className="form-label">{label}</label>
    </div>
  );
}

export default TextArea;