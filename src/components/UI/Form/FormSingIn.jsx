import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailSvg from '../../Image/SVG/Email';
import LockSvg from '../../Image/SVG/Lock';
import styles from './Form.module.css';

const FormSignIn = ({ email, emailChangeHandler, password, passwordChangeHandler, onSubmit, error, setError }) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    if (password.length < 6) {
      setPasswordError('no-password');
    }
    if (!email.length) {
      setEmailError('no-email');
    }
  };
  return (
    <form className={styles.form} onSubmit={(event) => {
      event.preventDefault();
      validateForm();
      if (passwordError || emailError) {
        return;
      }
      onSubmit(email, password);
    }} onClick={(event) => {
      event.stopPropagation();
    }}>
      <Input type="email" name="email" value={email} onChange={emailChangeHandler} placeholder="Email" authError={error} setAuthError={setError} fieldError={emailError} setFieldError={setEmailError}>
        <EmailSvg />
      </Input>
      <Input type="password" name="password" value={password} onChange={passwordChangeHandler} placeholder="Password" authError={error} setAuthError={setError} fieldError={passwordError} setFieldError={setPasswordError}>
        <LockSvg />
      </Input>
      <Button type="submit" text="SignIn" onClick={(event) => {
        event.preventDefault();
        validateForm();
        if (passwordError || emailError) {
          return;
        }
        onSubmit(email, password);
      }} className="submit" />
      <Button type="reset" text="Reset" onClick={() => {
        emailChangeHandler('');
        passwordChangeHandler('');
      }} className="reset" />
    </form>
  );
};

export default FormSignIn;
