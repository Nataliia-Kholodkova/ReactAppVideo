import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/userAuthContext';
import Parser from 'html-react-parser';
import CarouselConponent from '../UI/Carousel/CarouselComponent';
import Image from '../Image/Image';
import noImg from '../../assets/img/no-image.svg';
import Heart from '../Image/SVG/Heart';
import Error from '../appPages/Error/Error';
import calculateStars from '../../utils/calculateRatingStars';
import { heartOnClick } from '../../utils/listeners';
import styles from './ShowBig.module.css';

const ShowBig = ({ show }) => {
  if (Object.keys(show).length === 0) {
    return null;
  }
  const [updateError, setUpdateError] = useState(null);
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const { likedShows } = currentUserProfile || {};
  const isFavourite = likedShows ? likedShows.includes(show.id) : false;
  const { image, name, rating: { average }, premiered, genres, status, schedule: { time, days }, summary, _embedded: { cast } } = show;
  const stars = calculateStars(average);
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.imageContainer}>
        <Image src={image?.original ?? image?.medium ?? noImg} alt={show.name} className="showBigImg" />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.stars}>
          {stars}
        </div>
        <div className={styles.container}>
          <h3>Premiered:</h3>
          <p>{premiered}</p>
        </div>
        <div className={styles.genres}>
          <h3>Genres</h3>
            {
              genres.map((genre) =>
                <span className={styles.genre} key={genre}>
                  {genre}
                </span>)
            }
        </div>
        <div className={styles.container}>
          <h3>Streaming Shedule:</h3>
          {status === 'Ended'
            ? <p>{status}</p>
            : <p>{time}, {days.map((day) => <span key={day}>{day}</span>)}</p>
          }
          {currentUser && <button className={styles.favouriteLink} onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setUpdateError(null);
            heartOnClick(currentUser, show, isFavourite, likedShows)
              .catch(() => setUpdateError('Server error. Try Later'));
          }}>
        <Heart className={isFavourite ? 'favourite' : 'usual'} />
        </button>}
        </div>
      </div>
      <div className={styles.container}>
        {Parser(summary)}
      </div>
      <CarouselConponent items={cast} isActor={true} />
      {updateError && <Error error={updateError} />}
    </section>
  );
};

export default ShowBig;
