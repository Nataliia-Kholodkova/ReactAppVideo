import React from 'react';
import { Form, Field } from 'react-final-form';
import Button from '../Button/Button';
import styles from './Form.module.css';

const FormUpdateProfile = ({ onSubmit }) => (
  <Form
    onSubmit={(data) => {
      const { firstName, lastName, gender, country, city, phone } = data;
      onSubmit(firstName, lastName, gender, country, city, phone);
    }}
    render={({
      handleSubmit,
      submitting,
      form
    }) => (
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onClick={(event) => {
            event.stopPropagation();
          }}>
          <Field
            name="firstName"
              render={({ input }) => (
                <label className={styles.labelText}>
                  <input
                    type="text"
                    {...input}
                    placeholder="First Name"
                    className={styles.input} />
                </label>
              )}/>
          <Field
            name="lastName"
            render={({ input }) => (
              <label className={styles.labelText}>
                  <input
                    type="text"
                    {...input}
                    placeholder="Last Name"
                    className={styles.input} />
                </label>
            )} />
        <Field
            name="country"
            render={({ input }) => (
              <label className={styles.labelText}>
                  <input
                    type="text"
                    {...input}
                    placeholder="Country"
                    className={styles.input} />
                </label>
            )} />
        <Field
            name="city"
            render={({ input }) => (
              <label className={styles.labelText}>
                  <input
                    type="text"
                    {...input}
                    placeholder="City"
                    className={styles.input} />
                </label>
            )}/>
            <Field
            name="phone"
            render={({ input }) => (
              <label className={styles.labelText}>
                  <input
                    type="phone"
                    {...input}
                    placeholder="Phone"
                    className={styles.input} />
                </label>
            )}/>
        <label className={styles.label}>
          <span>Select you gender</span>
          <Field name="gender" component="select" className={styles.select}>
              <option />
              <option value="Female">Female</option>
              <option value="Male">Male</option>
          </Field>
        </label>
            <Button type="submit" text="SignIn" className="submit" disabled={submitting} />
            <Button type="reset" text="Reset" className="reset" disabled={submitting} onClick={form.reset} />
          </form>)
      } />
);

export default FormUpdateProfile;
