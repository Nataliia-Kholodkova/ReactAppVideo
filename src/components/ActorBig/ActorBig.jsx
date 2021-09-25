import React from 'react';
import CarouselConponent from '../UI/Carousel/CarouselComponent';
import Image from '../Image/Image';
import maleImg from '../../assets/img/avatar_male.png';
import femaleImg from '../../assets/img/avatar_female.png';
import 'react-multi-carousel/lib/styles.css';
import styles from './ActorBig.module.css';

const ActorBig = ({ actor, cast }) => {
  if (Object.keys(actor).length === 0 || Object.keys(cast).length === 0) {
    return null;
  }
  const { image, name, country: { name: country }, birthday, deathday, gender } = actor;
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.imageContainer}>
        <Image src={image?.original ?? image?.medium ?? (gender === 'Male'
          ? maleImg
          : femaleImg)} alt={name} className="showBigImg" />
      </div>
      <div className={styles.contentContainer}>
        {birthday && <div className={styles.container}>
          <p>{`${birthday} - ${deathday ?? '...'}`}</p>
        </div>}
        <div className={styles.container}>
          <h3>Country</h3>
          <p>{country}</p>
        </div>
      </div>
      <CarouselConponent items={cast} isActor={false} bigHover={false} />
    </section>
  );
};

export default ActorBig;
