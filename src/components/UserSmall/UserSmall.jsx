import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../Image/Image';
import maleImg from '../../assets/img/avatar_male.png';
import femaleImg from '../../assets/img/avatar_female.png';
import Button from '../UI/Button/Button';
import styles from './UserSmall.module.css';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const UserSmall = ({ user, followed, updateFollowedList, currentUser, currentUserFriendIds }) => {
  const hist = useHistory();
  if (Object.keys(user).length === 0) {
    return null;
  }
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const storageRef = ref(getStorage(), `userProfile/${user.uid}`);
    getDownloadURL(storageRef)
      .then((src) => setPhoto(src))
      .catch((error) => console.log(error.message));
  }, []);

  const buttonOnClick = () => {
    const newUsers = followed
      ? currentUserFriendIds.filter((id) => id !== user.uid)
      : currentUserFriendIds.concat([user.uid]);
    updateFollowedList(currentUser, newUsers);
  };

  const { firstName, lastName, country, uid } = user;
  return (
    <section onClick={() => hist.push(`/profile/${uid}`)} className={styles.section}>
      <div className={styles.imageContainer}>
        <Image src={photo ?? (user.gender === 'Male'
          ? maleImg
          : femaleImg)} alt={name} className="userSmallImg" />
        <Button type="button" className="follow" onClick={(event) => {
          event.preventDefault();
          buttonOnClick();
        }
        } text={followed ? 'Unfollow' : 'Follow'} />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.title}>{`${firstName} ${lastName}`}</h3>
        <p className={styles.text}>{country}</p>
      </div>
    </section>
  );
};

export default UserSmall;
