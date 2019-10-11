import React from 'react'

function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" type={props.type || 'text'} ref={props.ref}></textarea>
      <label className="form-label">{props.label}</label>
    </div>
  );
}

export default TextArea;