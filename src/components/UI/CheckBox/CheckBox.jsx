import React from 'react';

const CheckBox = ({ name, value, title, onChange }) => {
  return (
    <label>
      <input type="checkbox" name={name} value={value} onChange={(event) => onChange(event)} />
      {title}
    </label>
  );
};

export default CheckBox;
