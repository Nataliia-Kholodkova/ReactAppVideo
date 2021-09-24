import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormSignIn from '../../UI/Form/FormSingIn';
import styles from './LoginPage.module.css';
import { signInUserActionCreator, setUserAuthError } from '../../../redux/actionCreators/userActionCreators';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';

const SignInPage = ({ setLogin, error, setError, setIsVisible, isVisible, setLincActive }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classList = [styles.modal];
  if (isVisible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && !error) {
        setLincActive(false);
        setIsVisible(false);
      }
    });
  });

  return (
    <main className="main mainSingle">
      <div className={classList.join(' ')} onClick={() => {
        setIsVisible(false);
      }}>
        <FormSignIn email={email} emailChangeHandler={setEmail} password={password} passwordChangeHandler={setPassword} onSubmit={setLogin} error={error} setError={setError} />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => (
  {
    setLogin: (email, password) => dispatch(signInUserActionCreator(email, password)),
    setError: (error) => dispatch(setUserAuthError(error))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
