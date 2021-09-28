import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import FormSignUp from '../../UI/Form/FormSignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';
import styles from './SignUpPage.module.css';

const SignUpPage = ({ isModal }) => {
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
        hist.push({
          pathname: '/updateProfile',
          state: { modal: true }
        });
      }
    });
    return subscr;
  });

  return (
    <div className={classList.join(' ')} onClick={() => {
      setVisible(false);
      isModal ? hist.goBack() : hist.push('/');
    }}>
      <FormSignUp />
    </div>
  );
};

export default SignUpPage;
