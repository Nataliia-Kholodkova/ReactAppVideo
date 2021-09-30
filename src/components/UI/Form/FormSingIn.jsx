import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../Button/Button';
import EmailSvg from '../../Image/SVG/Email';
import LockSvg from '../../Image/SVG/Lock';
import { signInValidate, catchAuthError } from '../../../utils/authErrors';
import { signIn } from '../../../firebaseConf/authUser';
import styles from './Form.module.css';

const FormSignIn = () => <Form onSubmit={(data) => {
  const { email, password } = data;
  return signIn(email, password)
    .catch((error) => catchAuthError(error));
}}
  validate={(data) => signInValidate(data)}
  render={({
    handleSubmit,
    submitError,
    submitting,
    form
  }) => (
    <form className={styles.form} onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
      <Field name="email" render={({ input, meta }) => (
        <label className={styles.labelText}>
          <input type="email" {...input} placeholder="Email" className={`${styles.input} ${meta.error ? styles.error : ''}`} />
          <EmailSvg />
          {(meta.error || meta.submitError) && meta.touched && (
            <span className={styles.small}>{meta.error || meta.submitError}</span>)}
        </label>
      )} />
      <Field name="password" render={({ input, meta }) => (
        <label className={styles.labelText}>
          <input type="password" {...input} placeholder="Password" className={`${styles.input} ${submitError ? styles.error : ''}`} />
          <LockSvg />
          {(meta.error || meta.submitError) && meta.touched && (
            <span className={styles.small}>{meta.error || meta.submitError}</span>
          )}
        </label>
      )} />
      <Button type="submit" text="Sign In" className="submit" disabled={submitting} />
      <Button type="reset" text="Reset" className="reset" disabled={submitting} onClick={form.reset} />
    </form>)
  }
/>;

export default FormSignIn;
