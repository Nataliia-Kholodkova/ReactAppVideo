import React from 'react';
import spinner from '../../../assets/img/loader.svg';
import Image from '../../Image/Image';
import styles from './Preloader.module.css';

const Preloader = ({ className }) => (
    <div className={styles.container}>
      <Image className={className} src={spinner} alt="Preloader image spinner" />
    </div>
);

export default Preloader;
