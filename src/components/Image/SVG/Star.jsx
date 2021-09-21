import React from 'react';
import styles from './Svg.module.css';
const StarSvg = ({ classNames }) => (
  <svg height="25" width="23" className={classNames.map((cls) => styles[cls]).join(' ')}>
    <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
  </svg>
);

export default StarSvg;
