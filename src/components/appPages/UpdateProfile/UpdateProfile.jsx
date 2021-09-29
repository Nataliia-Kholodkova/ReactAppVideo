import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/userAuthContext';
import FormUpdateProfile from '../../UI/Form/FormUpdateProfile';
import { updateProfileInitials, updateUserProfileData } from '../../../firebaseConf/profileUpdate';
import styles from './UpdateProfile.module.css';

const UpdateProfile = ({ setLinkActive, isModal }) => {
  const hist = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [visible, setVisible] = useState(true);
  const classList = [styles.modal];
  if (visible) {
    classList.push(styles.visible);
  }

  const updateProfileHandler = (firstName, lastName, gender, country, city, phone) => {
    Promise.all([updateProfileInitials(firstName, lastName, currentUser), updateUserProfileData(currentUser, firstName, lastName, gender, country, city, phone)])
      .finally(() => {
        if (setLinkActive) {
          setLinkActive(false);
        }
        setVisible(false);
        hist.push(`/profile/${currentUser.uid}`);
      });
  };

  return (
      <div className={classList.join(' ')} onClick={() => {
        setVisible(false);
        isModal ? hist.goBack() : hist.push('/profile');
      }}>
        <FormUpdateProfile onSubmit={updateProfileHandler} />
      </div>
  );
};

export default UpdateProfile;
