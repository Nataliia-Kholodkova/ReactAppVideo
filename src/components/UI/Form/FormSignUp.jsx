import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailSvg from '../../Image/SVG/Email';
import LockSvg from '../../Image/SVG/Lock';
import styles from './Form.module.css';

const FormSignUp = ({ email, emailChangeHandler, password, passwordChangeHandler, passwordConfirm, passwordConfirmChangeHandler, onSubmit, setError, error }) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');

  const validateForm = () => {
    if (password.length < 6 || passwordConfirm.length < 6) {
      setPasswordError('no-password');
    }
    if (password !== passwordConfirm) {
      setPasswordError('password-not-match');
    }
    if (!email.length) {
      setEmailError('no-email');
    }
  };

  return (
    <form
      className={styles.form}
      onClick={(event) => {
        event.stopPropagation();
      }}
      onSubmit={(event) => {
        event.preventDefault();
        validateForm();
        if (passwordError || emailError || passwordConfirmError) {
          return;
        }
        onSubmit(email, password);
      }}
    >
      <Input type="email" name="email" value={email} onChange={emailChangeHandler} placeholder="Email" authError={error} setAuthError={setError} fieldError={emailError} setFieldError={setEmailError}>
        <EmailSvg />
      </Input>
      <Input type="password" name="password" value={password} onChange={passwordChangeHandler} placeholder="Password" authError={error} setAuthError={setError} fieldError={passwordError} setFieldError={setPasswordError}>
        <LockSvg />
      </Input>
      <Input type="password" name="passwordConfirm" value={passwordConfirm} onChange={passwordConfirmChangeHandler} placeholder="Confirm password" authError={error} setAuthError={setError} fieldError={passwordConfirmError} setFieldError={setPasswordConfirmError}>
        <LockSvg />
      </Input>
      <Button type="submit" text="SignUn" onClick={(event) => {
        event.preventDefault();
        validateForm();
        if (passwordError || emailError || passwordConfirmError) {
          return;
        }
        onSubmit(email, password);
      }} className="submit" />
      <Button type="reset" text="Reset" onClick={() => {
        emailChangeHandler('');
        passwordChangeHandler('');
        passwordConfirmChangeHandler('');
      }} className="reset" />
    </form>
  );
};

export default FormSignUp;
