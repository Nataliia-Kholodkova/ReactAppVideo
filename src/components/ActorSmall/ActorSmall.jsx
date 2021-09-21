import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../Image/Image';
import maleImg from '../../assets/img/avatar_male.png';
import femaleImg from '../../assets/img/avatar_female.png';
import styles from './ActioSmall.module.css';

const ActorSmall = ({ actor }) => {
  const hist = useHistory();
  if (Object.keys(actor).length === 0) {
    return null;
  }
  const { name, image, id } = actor;
  return (
    <section onClick={() => hist.push(`/actors/${id}`)} className={styles.section}>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.imageContainer}>
        <Image src={image?.original ?? image?.medium ?? (actor.gender === 'Male'
          ? maleImg
          : femaleImg)} alt={name} className="showSmallImg" />
      </div>
    </section>
  );
};

export default ActorSmall;
