import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { AuthContext } from '../../../context/userAuthContext';
import styles from './UpdateProfile.module.css';
import FormUpdateProfile from '../../UI/Form/FormUpdateProfile';
import {
  updateProfilePhotoActionCreator,
  updateProfileInitialsActionCreator, updateUserProfileData
} from '../../../redux/actionCreators/userActionCreators';

const UpdateProfile = ({ errors, updateInitials, updateProfile, updatePhoto, setIsVisible, isVisible, setLinkActive }) => {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const classList = [styles.modal];
  if (isVisible) {
    classList.push(styles.visible);
  }

  const updateProfileHandler = () => {
    Promise.all([updatePhoto(user, photo), updateInitials(firstName, lastName, user), updateProfile(user, firstName, lastName, gender)])
      .finally(() => {
        if (setLinkActive) {
          setLinkActive(false);
        }
        setIsVisible(false);
      });
  };

  return (
    <main className="main mainSingle">
      <div className={classList.join(' ')} onClick={() => {
        setIsVisible(false);
      }}>
        <FormUpdateProfile firstName={firstName} firstNameChangeHandler={setFirstName} lastName={lastName} lastNameChangeHandler={setLastName} gender={gender} genderChangeHandler={setGender} photo={photo} photoChangeHandler={setPhoto} onSubmit={updateProfileHandler} />
      </div>
    </main>
  );
};

const mapStateTpProps = (state) => ({ errors: state.user });

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhoto: (user, photo) => dispatch(updateProfilePhotoActionCreator(user, photo)),
    updateInitials: (firstName, lastName, user) => dispatch(updateProfileInitialsActionCreator(firstName, lastName, user)),
    updateProfile: (user, firstName, lastName, gender) => dispatch(updateUserProfileData(user, firstName, lastName, gender)),
  };
};

export default connect(mapStateTpProps, mapDispatchToProps)(UpdateProfile);
