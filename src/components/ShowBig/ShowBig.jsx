import React from 'react';
import Parser from 'html-react-parser';
import CarouselConponent from '../UI/Carousel/CarouselComponent';
import Image from '../Image/Image';
import noImg from '../../assets/img/no-image.svg';
import calculateStars from '../../utils/calculateRatingStars';
import styles from './ShowBig.module.css';

const ShowBig = ({ show }) => {
  if (Object.keys(show).length === 0) {
    return null;
  }
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
        </div>
      </div>
      <div className={styles.container}>
        {Parser(summary)}
      </div>
      <CarouselConponent items={cast} isActor={true} />
    </section>
  );
};

export default ShowBig;
