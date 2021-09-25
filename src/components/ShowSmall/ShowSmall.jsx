import React from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import noImg from '../../assets/img/no-image.svg';
import Image from '../Image/Image';
import Heart from '../Image/SVG/Heart';
import calculateStars from '../../utils/calculateRatingStars';
import styles from './ShowSmall.module.css';

const ShowSmall = ({ show, setFilter, likedShows, user, setLiked }) => {
  const hist = useHistory();
  const stars = calculateStars(show.rating.average);
  const isFavourite = likedShows ? likedShows.includes(show.id) : false;
  const heartOnClick = () => {
    const newShows = isFavourite
      ? likedShows.filter((id) => id !== show.id)
      : likedShows.concat([show.id]);
    setLiked(user, newShows);
  };
  return (
    <section onClick={() => hist.push(`/shows/show/${show.id}`)} className={styles.section}>
      {!show.image?.medium && <h1 className={styles.title}>{show.name}</h1>}
      <div className={styles.imageContainer}>
        <Image src={show.image?.medium ?? noImg} alt={show.name} className="showSmallImg" />
        {user && <a className={styles.favouriteLink} href="#" onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          heartOnClick();
        }}>
        <Heart className={isFavourite ? 'favourite' : 'usual'} />
        </a>}
      </div>
      <div className={styles.content}>
        <div className={styles.genres}>
          {
            show.genres.map((genre) =>
              <NavLink to={`/shows/${genre}`} className={styles.genre} key={genre} onClick={(event) => {
                event.stopPropagation();
                setFilter([genre]);
              }
              }>
                {genre}
              </NavLink>)
          }
        </div>
        <div className={styles.stars}>
          {stars}
        </div>
        <p className={styles.date}>{show.premiered}</p>
      </div>
    </section>
  );
};

export default ShowSmall;
