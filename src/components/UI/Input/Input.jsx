import React from 'react';
import styles from './Input.module.css';
import authErrors from '../../../utils/authErrors';

const Input = ({ children, ...props }) => {
  const { type, name, value, onChange, placeholder, error, setError } = props;
  const { errorType, errorMessage } = error ? authErrors[error.match(/auth\/([\w-]*)/)[1]] : { errorType: '', errorMessage: '' };
  const classNames = [styles.input];
  let errorSpan = null;
  if (
    (errorType === type)
  ) {
    classNames.push(styles.error);
    errorSpan = <span className={styles.small}>{errorMessage}</span>;
  }
  return (
    <label className={styles.label}>
      <input type={type} name={name} value={value} placeholder={placeholder} className={classNames.join(' ')} onChange={({ target }) => {
        if (setError) {
          setError(null);
        };
        onChange(target.value);
      }} />
      {children}
      {errorSpan}
    </label>
  );
};

export default Input;
