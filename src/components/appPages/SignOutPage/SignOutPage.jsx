import React, { useEffect } from 'react';
import styles from './SignOutPage.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';

const SignOutPage = ({ setIsVisible, isVisible, setLincActive }) => {
  const classList = [styles.modal];
  if (isVisible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setTimeout(() => {
          setLincActive(false);
          setIsVisible(false);
        }, 5000);
      }
    });
  });
  return (
    <main className="main mainSingle">
      <div className={classList.join(' ')} onClick={() => {
        setIsVisible(false);
      }}>
        <div className={styles.inner}>
          <p>You have successfully signed out</p>
        </div>
      </div>
    </main>
  );
};

export default SignOutPage;
