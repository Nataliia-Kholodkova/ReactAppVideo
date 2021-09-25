import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthContext } from '../../../context/userAuthContext';
import FormUpdateProfile from '../../UI/Form/FormUpdateProfile';
import {
  updateProfilePhotoActionCreator,
  updateProfileInitialsActionCreator, updateUserProfileData
} from '../../../redux/actionCreators/userActionCreators';
import styles from './UpdateProfile.module.css';

const UpdateProfile = ({ updateInitials, updateProfile, updatePhoto, setLinkActive }) => {
  const hist = useHistory();
  const { user, profile } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [gender, setGender] = useState(profile?.gender || '');
  const [photo, setPhoto] = useState('');
  const [visible, setVisible] = useState(true);
  const classList = [styles.modal];
  if (visible) {
    classList.push(styles.visible);
  }

  const updateProfileHandler = () => {
    Promise.all([updatePhoto(user, photo), updateInitials(firstName, lastName, user), updateProfile(user, firstName, lastName, gender)])
      .finally(() => {
        if (setLinkActive) {
          setLinkActive(false);
        }
        setVisible(false);
        hist.push('/profile');
      });
  };

  return (
      <div className={classList.join(' ')} onClick={() => {
        setVisible(false);
      }}>
        <FormUpdateProfile firstName={firstName} firstNameChangeHandler={setFirstName} lastName={lastName} lastNameChangeHandler={setLastName} gender={gender} genderChangeHandler={setGender} photo={photo} photoChangeHandler={setPhoto} onSubmit={updateProfileHandler} />
      </div>
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
