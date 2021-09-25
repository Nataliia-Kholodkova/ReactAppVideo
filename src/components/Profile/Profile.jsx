import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/userAuthContext';
import Image from '../Image/Image';
import maleImg from '../../assets/img/avatar_male.png';
import femaleImg from '../../assets/img/avatar_female.png';
import 'react-multi-carousel/lib/styles.css';
import styles from './Profile.module.css';
import CarouselConponent from '../UI/Carousel/CarouselComponent';
import { getShowById } from '../../utils/getDataFromServer';
import Preloader from '../UI/Preloader/Preloader';
import UpdateProfile from '../appPages/UpdateProfile/UpdateProfile';

const Profile = () => {
  const { user, profile } = useContext(AuthContext);
  if (!user || !profile) {
    return <Preloader className="preloader" />;
  }
  const { firstName, lastName, gender, likedShows } = profile;
  const [shows, setShows] = useState([]);
  const [, setShowsLoad] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  useEffect(() => {
    setShowsLoad(true);
    Promise.all(likedShows.map((id) => getShowById(+id)))
      .then((data) => setShows(data))
      .finally(() => setShowsLoad(false));
  }, []);

  return (
    <>
      <section className={styles.section}>
        <button type="button" onClick={() => {
          setUpdateVisible(true);
        }}>Update</button>
        <h1 className={styles.title}>{`${firstName} ${lastName}`}</h1>
        <div className={styles.imageContainer}>
          <Image src={user?.photoURL ?? (gender && gender === 'Female'
            ? femaleImg
            : maleImg)} alt={`${firstName} ${lastName}`} className="showBigImg" />
        </div>
        <div className={styles.contentContainer}>
          <CarouselConponent items={shows} isActor={false} bigHover={false} />
        </div>
      </section>
      {updateVisible && <UpdateProfile setIsVisible={setUpdateVisible} isVisible={updateVisible} />}
    </>
  );
};

export default Profile;
