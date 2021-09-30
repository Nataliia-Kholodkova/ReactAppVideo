import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../../Image/Image';
import noImg from '../../../assets/img/no-image.svg';
import { AuthContext } from '../../../context/userAuthContext';
import Heart from '../../Image/SVG/Heart';
import Error from '../../appPages/Error/Error';
import styles from './Carousel.module.css';
import { heartOnClick } from '../../../utils/listeners';

const CarouselForShows = ({ item, bigHover }) => {
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const { likedShows } = currentUserProfile || {};
  const isFavourite = likedShows ? likedShows.includes(item.id) : false;
  const [updateError, setUpdateError] = useState(null);
  return (
    <>
    <NavLink to={`/shows/show/${item.id}`} className={styles.navLink}>
      <Image src={item?.image?.medium ?? noImg} alt={item.name} className="sliderImg" />
      {currentUser && <button className={styles.favouriteLink} href="#" onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setUpdateError(null);
        heartOnClick(currentUser, item, isFavourite, likedShows)
          .catch(() => setUpdateError('Server error. Try Later'));
      }}>
        <Heart className={isFavourite ? 'favourite' : 'usual'} />
        </button>}
      <div className={styles.hover}>
        <h3 className={!bigHover ? styles.smallHover : ''}>{item.name}</h3>
        {(bigHover && (item.schedule?.time || item.schedule?.days.length > 0))
          ? <p>
            {`Whatch it ${item.schedule.time
              ? `at ${item.schedule.time}`
              : 'whenever you want'} ${item.schedule?.days.length > 0
                ? `on ${item.schedule.days.join(', ')}`
                : ''}`}
          </p>
          : null}
        <p className={styles.small}>{`Presented by ${item?.webChannel?.name ?? 'unknown channel'}`}</p>
      </div>
      </NavLink>
      {updateError && <Error error={updateError} />}
      </>
  );
};

export default CarouselForShows;
