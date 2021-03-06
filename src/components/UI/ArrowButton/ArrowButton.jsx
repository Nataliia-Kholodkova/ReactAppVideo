import React from 'react';
import ArrowSvg from '../../Image/SVG/Arrow';
import styles from './Button.module.css';

const ArrowButton = ({ onClick }) => {
  const toggleClose = (event, func) => {
    event.target.closest('button').classList.toggle(styles.close);
    func();
  };

  return (
    <button type="button" className={styles.button} name="Show filters" onClick={(e) => toggleClose(e, onClick)}>
      <ArrowSvg />
    </button>
  );
};

export default ArrowButton;
