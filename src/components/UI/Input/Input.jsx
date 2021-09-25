import React from 'react';
import styles from './Input.module.css';
import authErrors from '../../../utils/authErrors';

const Input = ({ children, ...props }) => {
  const { type, name, value, onChange, placeholder, authError, setAuthError, fieldError, setFieldError, required } = props;
  const { errorType, errorMessage } = authError ? authErrors[authError.match(/auth\/([\w-]*)/)[1]] : { errorType: '', errorMessage: '' };
  const { inputErrorType, inputErrorMessage } = fieldError ? authErrors[fieldError] : { errorType: '', errorMessage: '' };
  const classNames = [styles.input];
  let errorSpan = null;
  if (
    (errorType === type)
  ) {
    classNames.push(styles.error);
    errorSpan = <span className={styles.small}>{errorMessage}</span>;
  } else {
    if (inputErrorType === type) {
      classNames.push(styles.error);
      errorSpan = <span className={styles.small}>{inputErrorMessage}</span>;
    }
  }
  return (
    <label className={styles.label}>
      <input type={type} name={name} value={value} placeholder={placeholder} className={classNames.join(' ')} onChange={({ target }) => {
        if (setAuthError) {
          setAuthError(null);
        };
        if (setFieldError) {
          setFieldError('');
        };
        onChange(target.value);
      }} required={required} />
      {children}
      {errorSpan}
    </label>
  );
};

export default Input;
