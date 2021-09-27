import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import FormSignUp from '../../UI/Form/FormSignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';
import { signUpUserActionCreator, setUserAuthError } from '../../../redux/actionCreators/userActionCreators';
import styles from './SignUpPage.module.css';

const SignUpPage = ({ authError, setSignup, setAuthError, isModal }) => {
  const hist = useHistory();
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const classList = [styles.modal];

  if (visible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    const subscr = onAuthStateChanged(firebaseAuth, (user) => {
      if (user && !authError) {
        setVisible(false);
        hist.push({
          pathname: '/updateProfile',
          state: { modal: true }
        });
      }
    });
    return subscr;
  }, []);

  return (
    <div className={classList.join(' ')} onClick={() => {
      setVisible(false);
      isModal ? hist.goBack() : hist.push('/');
    }}>
      <FormSignUp
        email={email}
        emailChangeHandler={setEmail}
        password={password}
        passwordChangeHandler={setPassword}
        passwordConfirm={passwordConfirm}
        passwordConfirmChangeHandler={setPasswordConfirm}
        onSubmit={setSignup}
        error={authError}
        setError={setAuthError} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  authError: state.user.authError,
});

const mapDispatchToProps = (dispatch) => (
  {
    setSignup: (email, password) => dispatch(signUpUserActionCreator(email, password)),
    setAuthError: (error) => dispatch(setUserAuthError(error))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
