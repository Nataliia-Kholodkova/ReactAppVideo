import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormSignUp from '../../UI/Form/FormSignUp';
import styles from './SignUpPage.module.css';
import { signUpUserActionCreator, setUserAuthError } from '../../../redux/actionCreators/userActionCreators';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';

const SignUpPage = ({ error, setSignup, setError, setIsVisible, isVisible, setLincActive }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
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
        <FormSignUp email={email} emailChangeHandler={setEmail} password={password} passwordChangeHandler={setPassword} passwordConfirm={passwordConfirm} passwordConfirmChangeHandler={setPasswordConfirm} onSubmit={setSignup} setError={setError} error={error} />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => (
  {
    setSignup: (email, password) => dispatch(signUpUserActionCreator(email, password)),
    setError: (error) => dispatch(setUserAuthError(error))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
