import React from 'react';
import styles from './Button.module.css';

const Button = ({ type, text, onClick, className }) => (
  <button className={`${styles.button} ${styles[className]}`} type={type} onClick={onClick}>{text}</button>
);

export default Button;
