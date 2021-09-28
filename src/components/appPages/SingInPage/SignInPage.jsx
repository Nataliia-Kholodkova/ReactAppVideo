import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import FormSignIn from '../../UI/Form/FormSingIn';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';
import styles from './LoginPage.module.css';

const SignInPage = ({ isModal }) => {
  const hist = useHistory();
  const [visible, setVisible] = useState(true);
  const classList = [styles.modal];
  if (visible) {
    classList.push(styles.visible);
  }
  useEffect(() => {
    const subscr = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setVisible(false);
        isModal ? hist.goBack() : hist.push('/');
      }
    });
    return subscr;
  }, []);

  return (
    <main className="main mainSingle">
      <div className={classList.join(' ')} onClick={() => {
        setVisible(false);
        isModal ? hist.goBack() : hist.push('/');
      }}>
        <FormSignIn />
      </div>
    </main>
  );
};

export default SignInPage;
