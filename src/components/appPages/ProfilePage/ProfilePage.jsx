import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/userAuthContext';
import Image from '../../Image/Image';
import maleImg from '../../../assets/img/avatar_male.png';
import femaleImg from '../../../assets/img/avatar_female.png';
import { getShowById, getUserById } from '../../../utils/getDataFromServer';
import { updateProfilePhoto } from '../../../firebaseConf/profileUpdate';
import Upload from '../../Image/SVG/Upload';
import Input from '../../UI/Input/Input';
import Tabs from '../../Tabs/Tabs';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const [shows, setShows] = useState([]);
  const [showsLoad, setShowsLoad] = useState(true);
  const [friends, setFriends] = useState([]);
  const [friendsLoad, setFriendsLoad] = useState(true);
  const [photo, setPohoto] = useState(null);
  const { firstName, lastName, gender, likedShows, country, city, friends: friendsId } = currentUserProfile || {};

  useEffect(() => {
    if (likedShows) {
      setShowsLoad(true);
      Promise.all(likedShows.map((id) => getShowById(+id)))
        .then((data) => setShows(data))
        .finally(() => setShowsLoad(false));
    }
  }, [likedShows?.length]);

  useEffect(() => {
    if (friendsId) {
      setFriendsLoad(true);
      Promise.all(friendsId.map((id) => getUserById(id)))
        .then((data) => setFriends(data))
        .finally(() => setFriendsLoad(false));
    }
  }, [friendsId?.length]);

  const upload = (photo) => {
    setPohoto(URL.createObjectURL(photo));
    updateProfilePhoto(currentUser, photo);
  };

  return (
    <>
      {currentUser && currentUserProfile &&
        <section className={styles.section}>
          <div className={styles.imageContainer}>
            <Image src={photo ?? currentUser?.photoURL ?? (gender && gender === 'Female'
              ? femaleImg
              : maleImg)} alt={`${firstName} ${lastName}`} className="showBigImg" />
            <div className={styles.photoUpload}>
              <Input type="file" className="fileLabel" inputClassName="visually-hidden" onChange={upload} name="photo">
                <Upload />
              </Input>
            </div>
          </div>
          <div className={styles.info}>
          <h1 className={styles.title}>{`${firstName} ${lastName}`}</h1>
          {(country || city) && <p>{`${country}${city ? `, ${city}` : ''}`}</p>}
            <NavLink to={{
              pathname: '/updateProfile',
              state: { modal: true }
            }} className={styles.buttonLink}>Update Profile</NavLink>
        </div>
        <Tabs shows={shows} showsLoad={showsLoad} friends={friends} friendsLoad={friendsLoad} currentUserProfile={currentUserProfile} friendsId={friendsId} />
        </section>
      }
  </>
  );
};

export default ProfilePage;
