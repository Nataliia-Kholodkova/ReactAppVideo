import React from 'react';
import authErrors from '../../../utils/authErrors';
import styles from './Input.module.css';

const Input = ({ children, ...props }) => {
  const {
    type,
    name,
    value,
    onChange,
    placeholder,
    authError,
    setAuthError,
    fieldError,
    setFieldError,
    required,
    className,
    labelSpan
  } = props;

  const { errorType, errorMessage } = authError
    ? authErrors[authError.match(/auth\/([\w-]*)/)[1]]
    : { errorType: '', errorMessage: '' };

  const { errorType: inputErrorType, errorMessage: inputErrorMessage } = fieldError
    ? authErrors[fieldError]
    : { errorType: '', errorMessage: '' };

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
    <label className={`${styles.label} ${styles[className] ?? ''}`}>
      <input type={type} name={name} value={value} placeholder={placeholder} className={classNames.join(' ')} onChange={({ target }) => {
        if (setAuthError) {
          setAuthError(null);
        };
        if (setFieldError) {
          setFieldError('');
        };
        if (type === 'file') {
          onChange(target.files[0]);
        } else {
          onChange(target.value);
        }
      }} required={required} />
      {children}
      {labelSpan ? <span>{labelSpan}</span> : null}
      {errorSpan}
    </label>
  );
};

export default Input;
