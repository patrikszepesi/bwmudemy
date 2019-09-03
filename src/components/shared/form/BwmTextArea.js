import React from 'react';

export const BwmTextArea = ({
  input,
  label,
  type,
  rows,
  placeholder,
  className,
  meta: { touched, error, warning }
}) => (
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'>
      <textarea {...input} type={type} rows={rows} className={className} placeholder={placeholder}></textarea>
    </div>
      {touched &&
        ((error && <div className='alert alert-danger'>{error}</div>))}
  </div>
)
