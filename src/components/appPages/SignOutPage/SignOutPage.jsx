import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './SignOutPage.module.css';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';

const SignOutPage = ({ setIsVisible, isVisible, setLinkActive }) => {
  const classList = [styles.modal];
  if (isVisible) {
    classList.push(styles.visible);
  }
  const hist = useHistory();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setTimeout(() => {
          setLinkActive(false);
          setIsVisible(false);
          hist.push('/');
        }, 1000);
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
