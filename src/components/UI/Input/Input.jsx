import React from 'react';
import styles from './Input.module.css';

const Input = ({ children, ...props }) => {
  const {
    type,
    name,
    value,
    onChange,
    placeholder,
    inputClassName,
    labelSpan,
    className
  } = props;

  return (
    <label className={styles[className]}>
      <input type={type} name={name} value={value} placeholder={placeholder} className={`${inputClassName} ${styles.input}`} onChange={({ target }) => {
        if (type === 'file') {
          onChange(target.files[0]);
        } else {
          onChange(target.value);
        }
      }} />
      {children}
      {labelSpan ? <span>{labelSpan}</span> : null}
    </label>
  );
};

export default Input;
