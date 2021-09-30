import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/userAuthContext';
import Image from '../../Image/Image';
import maleImg from '../../../assets/img/avatar_male.png';
import femaleImg from '../../../assets/img/avatar_female.png';
import { getShowById, getUserById, getUserPhoto } from '../../../utils/getDataFromServer';
import Tabs from '../../Tabs/Tabs';
import Preloader from '../../UI/Preloader/Preloader';
import Button from '../../UI/Button/Button';
import Accordeon from '../../UI/Accordeon/Accordeon';
import Error from '../Error/Error';
import { updateFriendsOnClick } from '../../../utils/listeners';
import styles from './UserPage.module.css';

const UserPage = () => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const { uid } = useParams();
  const [user, setUser] = useState();
  const [userLoad, setUserLoad] = useState(false);
  const [shows, setShows] = useState([]);
  const [showsLoad, setShowsLoad] = useState(true);
  const [friends, setFriends] = useState([]);
  const [friendsLoad, setFriendsLoad] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [userError, setUserError] = useState(null);
  const [updateFriendsError, setUpdateFriendsError] = useState(null);
  const [showsError, setShowsError] = useState(null);
  const [friendsError, setFriendsError] = useState(null);
  const { firstName, lastName, gender, likedShows, country, city, friends: friendsId, phone } = user || {};

  const followed = currentUserProfile?.friends?.includes(uid);

  useEffect(() => {
    setUserLoad(true);
    getUserById(uid)
      .then((data) => setUser(data))
      .catch((error) => {
        setUserError(`Server error: ${error.message}`);
      })
      .finally(() => setUserLoad(false));
  }, [uid]);

  useEffect(() => {
    getUserPhoto(uid)
      .then((src) => setPhoto(src))
      .catch((error) => error);
  }, []);

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

  return (
    <>
      {(user && !userError) &&
        <section className={styles.section}>
          <div className={styles.imageContainer}>
            <Image src={photo ?? (gender && gender === 'Female'
              ? femaleImg
              : maleImg)} alt={`${firstName} ${lastName}`} className="showBigImg" />
          </div>
          <div className={styles.info}>
          <h1 className={styles.title}>{`${firstName} ${lastName}`}</h1>
          {(country || city) && <p>{`${country}${city ? `, ${city}` : ''}`}</p>}
          {phone && <Accordeon items={[phone]} />}
          <Button type="button" className="followBig" onClick={() => {
            setUpdateFriendsError(null);
            updateFriendsOnClick(followed, friendsId, user, currentUser)
              .catch(() => setUpdateFriendsError('Server error. Try Later'));
          }
        } text={followed ? 'Unfollow' : 'Follow'} />
        </div>
        <Tabs shows={shows} showsLoad={showsLoad} friends={friends} friendsLoad={friendsLoad} currentUserProfile={currentUserProfile} friendsId={friendsId} showsError={showsError} friendsError={friendsError} />
        </section>
      }
      {userError && <Error error={userError} />}
      {userLoad && <Preloader className="preloader" />}
      {updateFriendsError && <Error error={updateFriendsError} />}
  </>
  );
};

export default UserPage;
