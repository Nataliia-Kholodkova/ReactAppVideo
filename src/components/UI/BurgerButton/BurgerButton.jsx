import React from 'react';
import styles from './Button.module.css';

const BurgerButton = ({ onClick, className }) => {
  const toggleClose = (event, func) => {
    event.target.classList.toggle(styles.close);
    func();
  };
  return (
    <button type="button" className={`${styles.button} ${styles[className]}`} name="Show filters" onClick={(e) => toggleClose(e, onClick)}><span></span></button>
  );
};

export default BurgerButton;
