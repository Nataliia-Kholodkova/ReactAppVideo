import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/userAuthContext';
import Image from '../Image/Image';
import Preloader from '../UI/Preloader/Preloader';
import Shows from '../Shows/Shows';
import maleImg from '../../assets/img/avatar_male.png';
import femaleImg from '../../assets/img/avatar_female.png';
import { getShowById } from '../../utils/getDataFromServer';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, profile } = useContext(AuthContext);
  if (!user || !profile) {
    return <Preloader className="preloader" />;
  }
  const { firstName, lastName, gender, likedShows } = profile;
  const [shows, setShows] = useState([]);
  const [showsLoad, setShowsLoad] = useState(true);

  useEffect(() => {
    setShowsLoad(true);
    Promise.all(likedShows.map((id) => getShowById(+id)))
      .then((data) => setShows(data))
      .finally(() => setShowsLoad(false));
  }, [likedShows.length]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.imageContainer}>
          <Image src={user?.photoURL ?? (gender && gender === 'Female'
            ? femaleImg
            : maleImg)} alt={`${firstName} ${lastName}`} className="showBigImg" />
        </div>
        <div className={styles.info}>
          <h1 className={styles.title}>{`${firstName} ${lastName}`}</h1>
          <NavLink to={{
            pathname: '/updateProfile',
            state: { modal: true }
          }} className={styles.buttonLink}>Update Profile</NavLink>
        </div>
        <div className={styles.contentContainer}>
          {shows.length > 0 && <h2 className={styles.title}>Favourite shows</h2>}
          {Shows.length === 0 && !showsLoad && <h2 className={styles.title}>You don&apos;t have favourite shows yet</h2>}
          <Shows shows={shows} isLoad={showsLoad} />
        </div>
      </section>
    </>
  );
};

export default Profile;
