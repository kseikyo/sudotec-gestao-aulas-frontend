import React from 'react';

function Option({value, description}) {
  return (<option key={value} value={value}>{description}</option>);
}

function Select({options, valueAttr = 'id', descriptionAttr = 'name', label, showDefault = true, value, ...rest}) {
  return (
    <div className="form-group">
      <select required={true} value={value || 0} {...rest} className="form-control">
        {showDefault ? 
          <option value="0" disabled>Selecione...</option> :
          <></>
        }
        {options.map(
          item => (
            <Option key={item[valueAttr]} value={item[valueAttr]} description={item[descriptionAttr]} />
          )
        )}
      </select>
      <label>{label}</label>
    </div>
  )
}

export default Select;