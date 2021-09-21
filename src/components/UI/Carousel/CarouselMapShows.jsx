import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../../Image/Image';
import noImg from '../../../assets/img/no-image.svg';
import styles from './Carousel.module.css';

const CarouselForShows = ({ item, bigHover }) => (
  <NavLink to={`/shows/show/${item.id}`} className={styles.navLink}>
    <Image src={item?.image?.medium ?? noImg} alt={item.name} className="sliderImg" />
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
);

export default CarouselForShows;
