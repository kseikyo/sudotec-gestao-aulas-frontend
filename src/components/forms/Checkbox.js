import React from 'react';

function Checkbox({label, value, description, checked = false, ...rest}) {
  return (
    <div className="form-check">
      <label className='d-block'>{label}</label>
      <input className="form-check-input" type="checkbox" defaultChecked={checked} value={value} {...rest} />
      <span className="form-check-label">
        {description}
      </span>
    </div>
  )
}

export default Checkbox;