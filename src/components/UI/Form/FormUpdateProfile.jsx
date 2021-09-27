import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Upload from '../../Image/SVG/Upload';
import styles from './Form.module.css';

const FormUpdateProfile = ({ firstName, firstNameChangeHandler, lastName, lastNameChangeHandler, gender, genderChangeHandler, photo, photoChangeHandler, onSubmit }) => (
  <form
    className={styles.form}
    onClick={(event) => {
      event.stopPropagation();
    }}
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit(firstName, lastName, gender, photo);
    }}
  >
    <Input type="text" name="firstName" value={firstName} onChange={firstNameChangeHandler} placeholder="First Name" />
    <Input type="text" name="lastName" value={lastName} onChange={lastNameChangeHandler} placeholder="Last name" />
    <label className={styles.label}>
      <span>Select you gender</span>
    <select name="gender" onChange={({ target }) => genderChangeHandler(target.value)
    } value={gender || 'Female'}
      className={styles.select}>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
    </select>
    </label>
    <Input type="file" name="photo" onChange={photoChangeHandler} className="fileLabel" labelSpan="Select new photo" >
      <Upload />
    </Input>
    <Button type="submit" text="Submit" className="submit" />
    <Button type="reset" text="Reset" onClick={() => {
      firstNameChangeHandler('');
      lastNameChangeHandler('');
      genderChangeHandler('');
      photoChangeHandler('');
    }} className="reset" />
  </form>
);

export default FormUpdateProfile;
