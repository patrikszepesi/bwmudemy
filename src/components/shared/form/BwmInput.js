import React from 'react';

export const BwmInput = ({
  input,
  label,
  type,
  placeholder,
  symbol,
  className,
  meta: { touched, error, warning }
}) => (
  <div className='form-group'>
    <label>{label}</label>
    <div className='input-group'>
      { symbol &&
        <div className='input-group-prepend'>
          <div className='input-group-text'>{symbol}</div>
        </div>
      }
      <input {...input} type={type} className={className}  placeholder={placeholder} />
    </div>
      {touched &&
        ((error && <div className='alert alert-danger'>{error}</div>))}
  </div>
)
