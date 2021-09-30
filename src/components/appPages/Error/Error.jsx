import React, { useState, useEffect } from 'react';
import styles from './Error.module.css';

const Error = ({ error }) => {
  const [visible, setVisible] = useState(true);
  const classList = [styles.modal];

  if (visible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  });

  return (
    <div className={classList.join(' ')} onClick={() => {
      setVisible(false);
    }}>
      <div className={styles.container}>
        <h1 className={styles.error}>{error}</h1>
      </div>
    </div>
  );
};

export default Error;
