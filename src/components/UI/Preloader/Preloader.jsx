import React from 'react';
import Image from '../../Image/Image';
import spinner from '../../../assets/img/loader.svg';
import styles from './Preloader.module.css';

const Preloader = ({ className }) => (
    <div className={styles.container}>
      <Image className={className} src={spinner} alt="Preloader image spinner" />
    </div>
);

export default Preloader;
