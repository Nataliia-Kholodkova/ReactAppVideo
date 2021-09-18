import React from 'react';

const Input = ({ type, name, value, onChange, placeholder }) => {
  return (
    <label>
      <input type={type} name={name} value={value} placeholder={placeholder} onChange={(e) => onChange(e)} />
    </label>
  );
};

export default Input;
