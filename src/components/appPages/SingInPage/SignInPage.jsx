import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import FormSignIn from '../../UI/Form/FormSingIn';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../../firebaseConf/firebaseConf';
import { signInUserActionCreator, setUserAuthError } from '../../../redux/actionCreators/userActionCreators';
import styles from './LoginPage.module.css';

const SignInPage = ({ setLogin, authError, setAuthError, isModal }) => {
  const hist = useHistory();
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classList = [styles.modal];
  if (visible) {
    classList.push(styles.visible);
  }

  useEffect(() => {
    const subscr = onAuthStateChanged(firebaseAuth, (user) => {
      if (user && !authError) {
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
        <FormSignIn email={email} emailChangeHandler={setEmail} password={password} passwordChangeHandler={setPassword} onSubmit={setLogin} error={authError} setError={setAuthError} />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  authError: state.user.authError,
});

const mapDispatchToProps = (dispatch) => (
  {
    setLogin: (email, password) => dispatch(signInUserActionCreator(email, password)),
    setAuthError: (error) => dispatch(setUserAuthError(error))
  });

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
