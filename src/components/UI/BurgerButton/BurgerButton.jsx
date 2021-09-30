import React from 'react';
import styles from './Button.module.css';

const BurgerButton = ({ onClick, className, isOpened }) => {
  const classNames = [styles.button, styles[className]];
  if (isOpened) {
    classNames.push(styles.close);
  }
  const toggleClose = (event, func) => {
    event.target.classList.toggle(styles.close);
    func();
  };
  return (
    <button type="button" className={classNames.join(' ')} name="Show filters" onClick={(e) => toggleClose(e, onClick)}><span></span></button>
  );
};

export default BurgerButton;
