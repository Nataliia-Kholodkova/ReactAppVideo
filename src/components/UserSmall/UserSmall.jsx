import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../Image/Image';
import maleImg from '../../assets/img/avatar_male.png';
import femaleImg from '../../assets/img/avatar_female.png';
import Button from '../UI/Button/Button';
import Error from '../appPages/Error/Error';
import { getUserPhoto } from '../../utils/getDataFromServer';
import { updateFriendsOnClick } from '../../utils/listeners';
import styles from './UserSmall.module.css';

const UserSmall = ({ user, followed, currentUser, currentUserFriendIds }) => {
  const hist = useHistory();
  if (Object.keys(user).length === 0) {
    return null;
  }

  const [photo, setPhoto] = useState(null);
  const [updateFriendsError, setUpdateFriendsError] = useState(null);

  useEffect(() => {
    getUserPhoto(user.uid)
      .then((src) => setPhoto(src))
      .catch((error) => error);
  }, []);

  const { firstName, lastName, country, uid } = user;
  return (
    <section onClick={() => hist.push(`/users/${uid}`)} className={styles.section}>
      <div className={styles.imageContainer}>
        <Image src={photo ?? (user.gender === 'Male'
          ? maleImg
          : femaleImg)} alt={name} className="userSmallImg" />
        <Button type="button" className="follow" onClick={(event) => {
          event.stopPropagation();
          setUpdateFriendsError(null);
          updateFriendsOnClick(followed, currentUserFriendIds, user, currentUser)
            .catch(() => setUpdateFriendsError('Server error. Try Later'));
        }
        } text={followed ? 'Unfollow' : 'Follow'} />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.title}>{`${firstName} ${lastName}`}</h3>
        <p className={styles.text}>{country}</p>
      </div>
      {updateFriendsError && <Error error={updateFriendsError} />}
    </section>
  );
};

export default UserSmall;
