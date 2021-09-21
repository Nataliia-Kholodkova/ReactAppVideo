import React from 'react';
import styles from './Radio.module.css';

const Radio = ({ name, value, title, checked, onChange }) => {
  return (
    <label className={styles.label}>
      <input type="radio" name={name} value={value} onChange={(event) => onChange(event)} defaultChecked={checked} className={`${styles.input} visually-hidden`} />
      <span className={styles.inputIco}></span>
    <span className={styles.title}>{title}</span>
    </label>
  );
};

export default Radio;
