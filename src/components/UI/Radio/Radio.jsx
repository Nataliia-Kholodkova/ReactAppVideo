import React from 'react';

const Radio = ({ name, value, title, checked, onChange }) => {
  return (
    <label>
      <input type="radio" name={name} value={value} onChange={(event) => onChange(event)} />
      {title}
    </label>
  );
};

export default Radio;
