import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/userAuthContext';
import Image from '../../Image/Image';
import maleImg from '../../../assets/img/avatar_male.png';
import femaleImg from '../../../assets/img/avatar_female.png';
import Upload from '../../Image/SVG/Upload';
import Input from '../../UI/Input/Input';
import Tabs from '../../Tabs/Tabs';
import Error from '../Error/Error';
import { getShowById, getUserById } from '../../../utils/getDataFromServer';
import { updateProfilePhoto } from '../../../firebaseConf/profileUpdate';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const [shows, setShows] = useState([]);
  const [showsLoad, setShowsLoad] = useState(true);
  const [showsError, setShowsError] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsLoad, setFriendsLoad] = useState(true);
  const [friendsError, setFriendsError] = useState(null);
  const [photo, setPohoto] = useState(null);
  const [updatePhotoError, setUpdatePhotoError] = useState(null);
  const { firstName, lastName, gender, likedShows, country, city, friends: friendsId } = currentUserProfile || {};

  useEffect(() => {
    if (likedShows) {
      setShowsLoad(true);
      Promise.all(likedShows.map((id) => getShowById(+id)))
        .then((data) => setShows(data))
        .catch((error) => setShowsError(`Server error: ${error.message}`))
        .finally(() => setShowsLoad(false));
    }
  }, [likedShows?.length]);

  useEffect(() => {
    if (friendsId) {
      setFriendsLoad(true);
      Promise.all(friendsId.map((id) => getUserById(id)))
        .then((data) => setFriends(data))
        .catch((error) => setFriendsError(`Server error: ${error.message}`))
        .finally(() => setFriendsLoad(false));
    }
  }, [friendsId?.length]);

  const upload = (photo) => {
    setUpdatePhotoError(null);
    updateProfilePhoto(currentUser, photo)
      .then(setPohoto(URL.createObjectURL(photo)))
      .catch(() => setUpdatePhotoError('Server error. Try to upload later.'));
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
          <Tabs shows={shows} showsLoad={showsLoad} friends={friends} friendsLoad={friendsLoad} currentUserProfile={currentUserProfile} friendsId={friendsId} showsError={showsError} friendsError={friendsError} />
          {updatePhotoError && <Error error={updatePhotoError} />}
        </section>
      }
  </>
  );
};

export default ProfilePage;
