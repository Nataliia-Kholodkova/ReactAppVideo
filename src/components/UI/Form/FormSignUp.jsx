import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import EmailSvg from '../../Image/SVG/Email';
import LockSvg from '../../Image/SVG/Lock';
import styles from './Form.module.css';

const FormSignUp = ({ email, emailChangeHandler, password, passwordChangeHandler, passwordConfirm, passwordConfirmChangeHandler, onSubmit, setError, error }) => (
  <form
    className={styles.form}
    onClick={(event) => {
      event.stopPropagation();
    }}
    onSubmit={(event) => {
      event.preventDefault();
      console.log(email, password);
      onSubmit(email, password);
    }}
  >
    <Input type="email" name="email" value={email} onChange={emailChangeHandler} placeholder="Email" setError={setError} error={error}>
      <EmailSvg />
    </Input>
    <Input type="password" name="password" value={password} onChange={passwordChangeHandler} placeholder="Password" setError={setError} error={error}>
      <LockSvg />
    </Input>
    <Input type="password" name="passwordConfirm" value={passwordConfirm} onChange={passwordConfirmChangeHandler} placeholder="Confirm password" setError={setError} error={error}>
      <LockSvg />
    </Input>
    <Button type="submit" text="SignUn" onClick={(event) => {
      event.preventDefault();
      onSubmit(email, password);
    }} className="submit" />
    <Button type="reset" text="Reset" onClick={() => {
      emailChangeHandler('');
      passwordChangeHandler('');
    }} className="reset" />
  </form>
);

export default FormSignUp;
