import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailSvg from '../../Image/SVG/Email';
import LockSvg from '../../Image/SVG/Lock';
import styles from './Form.module.css';

const FormSignIn = ({ email, emailChangeHandler, password, passwordChangeHandler, onSubmit, error, setError }) => (
  <form className={styles.form} onSubmit={(event) => {
    event.preventDefault();
    onSubmit(email, password);
  }} onClick ={(event) => {
    event.stopPropagation();
  }}>
    <Input type="email" name="email" value={email} onChange={emailChangeHandler} placeholder="Email" error={error} setError={setError}>
      <EmailSvg />
    </Input>
    <Input type="password" name="password" value={password} onChange={passwordChangeHandler} placeholder="Password" error={error} setError={setError}>
      <LockSvg />
    </Input>
    <Button type="submit" text="SignIn" onClick={(event) => {
      event.preventDefault();
      onSubmit(email, password);
    }} className="submit" />
    <Button type="reset" text="Reset" onClick={() => {
      emailChangeHandler('');
      passwordChangeHandler('');
    }} className="reset" />
  </form>
);

export default FormSignIn;
