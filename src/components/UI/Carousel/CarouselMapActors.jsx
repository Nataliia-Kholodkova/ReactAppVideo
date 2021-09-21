import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../../Image/Image';
import maleImg from '../../../assets/img/avatar_male.png';
import femaleImg from '../../../assets/img/avatar_female.png';
import styles from './Carousel.module.css';

const CarouselForActors = ({ item }) => {
  return (
    <NavLink to={`/actors/${item.id}`} className={styles.navLink}>
      <Image
        src={item.image?.medium ?? (
          item.gender === 'Male'
            ? maleImg
            : femaleImg
        )}
        alt={item.name}
        className="showSmallImg"
      />
      <div className={styles.hover}>
        <h3>{item.name}</h3>
      </div>
    </NavLink>
  );
};

export default CarouselForActors;
