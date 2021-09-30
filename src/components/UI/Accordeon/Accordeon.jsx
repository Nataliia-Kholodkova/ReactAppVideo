import React, { useState } from 'react';
import styles from './Accordeon.module.css';

const Accordeon = ({ items }) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className={styles.container}>
      <button className={styles.accordeon}
        disabled={items.length === 0}
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}>Open Contacts</button>
        <div className={`${styles.pannel} ${isOpened ? styles.open : ''}`}>
        {items.map((item) => <p key={item} className={styles.text}>{item}</p>)}
      </div>
    </div>
  );
};

export default Accordeon;
