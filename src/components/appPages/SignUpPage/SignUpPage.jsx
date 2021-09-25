import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormSignUp from '../../UI/Form/FormSignUp';
import styles from './SignUpPage.module.css';
import { signUpUserActionCreator, setUserAuthError } from '../../../redux/actionCreators/userActionCreators';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';
import UpdateProfile from '../UpdateProfile/UpdateProfile';

const SignUpPage = ({ authError, setSignup, setAuthError, setIsVisible, isVisible, setLinkActive }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [updateProfileShow, setUpdateProfileShow] = useState('false');
  const classList = [styles.modal];
  if (isVisible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user && !authError) {
        setLinkActive(false);
        setIsVisible(false);
        setUpdateProfileShow(true);
      }
    });
  });
  return (
    <main className="main mainSingle">
      <div className={classList.join(' ')} onClick={() => {
        setIsVisible(false);
      }}>
        <FormSignUp email={email} emailChangeHandler={setEmail} password={password} passwordChangeHandler={setPassword} passwordConfirm={passwordConfirm} passwordConfirmChangeHandler={setPasswordConfirm} onSubmit={setSignup} error={authError} setError={setAuthError} />
        {updateProfileShow && <UpdateProfile setIsVisible={setUpdateProfileShow} isVisible={updateProfileShow} />}
      </div>
    </main>
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
