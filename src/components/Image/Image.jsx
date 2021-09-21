import React from 'react';
import style from './Image.module.css';

const Image = ({ className, src, alt }) => (
  <img className={style[className]} src={src} alt={alt} />
);

export default Image;
