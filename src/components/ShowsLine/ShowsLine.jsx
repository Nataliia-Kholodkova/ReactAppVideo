import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ShowsLine.module.css';
import CarouselConponent from '../UI/Carousel/CarouselComponent';

const Line = ({ shows, genre, setGenre, isLoad }) => {
  if (isLoad) {
    return null;
  }
  return (
    <section className={styles.section}>
      {!isLoad && shows.length > 0
        ? <>
          <NavLink
        to={`/shows/${genre}`}
        onClick={() => setGenre([genre])}
        className={styles.linkTitle}
      >
        {genre}
        </NavLink>
          <CarouselConponent items={shows} isActor={false} bigHover />
        </>
        : null}
    </section>
  );
};

export default Line;
