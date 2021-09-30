import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';
import { logout } from '../../../firebaseConf/authUser';
import styles from './SignOutPage.module.css';

const SignOutPage = ({ isModal }) => {
  const [visible, setVisible] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const classList = [styles.modal];
  if (visible) {
    classList.push(styles.visible);
  }
  const hist = useHistory();

  useEffect(() => {
    const subscr = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        setTimeout(() => {
          setVisible(false);
          hist.push('/');
        }, 1000);
      }
    });
    return subscr;
  });

  return (
    <div className={classList.join(' ')} onClick={() => {
      setVisible(false);
      isModal ? hist.goBack() : hist.push('/');
    }}>
      <div className={styles.inner}>
        {showButton && <Button type="button" text="Sign Out" onClick={() => {
          logout();
          setShowButton(false);
        }} className="submit" />}
        {!showButton && <p>You have successfully signed out</p>}
      </div>
    </div>
  );
};

export default SignOutPage;
