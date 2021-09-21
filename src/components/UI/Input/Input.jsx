import React from 'react';
import SearchSvg from '../../Image/SVG/Search';
import styles from './Input.module.css';

const Input = ({ type, name, value, onChange, placeholder }) => {
  return (
    <label className={styles.label}>
      <input type={type} name={name} value={value} placeholder={placeholder} className={styles.input} onChange={(e) => onChange(e)} />
      <SearchSvg />
    </label>
  );
};

export default Input;
