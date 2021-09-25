import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import styles from './Form.module.css';

const FormUpdateProfile = ({ firstName, firstNameChangeHandler, lastName, lastNameChangeHandler, gender, genderChangeHandler, photo, photoChangeHandler, onSubmit }) => (
  <form
    className={styles.form}
    onClick={(event) => {
      event.stopPropagation();
    }}
    onSubmit={(event) => {
      event.preventDefault();
      console.log('submitted');
      onSubmit(firstName, lastName, gender, photo);
    }}
  >
    <Input type="text" name="firstName" value={firstName} onChange={firstNameChangeHandler} placeholder="First Name" />
    <Input type="text" name="lastName" value={lastName} onChange={lastNameChangeHandler} placeholder="Last name" />
    <select name="gender" onChange={({ target }) => genderChangeHandler(target.value)
    } value={gender}>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
    </select>
    <input type="file" name="photo" onChange={({ target }) => {
      console.log(target.files[0]);
      photoChangeHandler(target.files[0]);
    }
    } />
    <Button type="submit" text="SignUn" onClick={(event) => {
      event.preventDefault();
      onSubmit(firstName, lastName, gender, photo);
    }} className="submit" />
    <Button type="reset" text="Reset" onClick={() => {
      firstNameChangeHandler('');
      lastNameChangeHandler('');
      genderChangeHandler('');
      photoChangeHandler('');
    }} className="reset" />
  </form>
);

export default FormUpdateProfile;
