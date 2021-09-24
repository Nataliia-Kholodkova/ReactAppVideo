import { USER_SET_AUTH_ERROR, USER_SET_USER } from '../constants';
import { signUp, signIn, logout } from '../../firebaseConf/authUser';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseFirestore, firebaseAuth } from '../../firebaseConf/firebaseConf';
import authFields from '../../utils/authFields';

const currentUserHandler = (dispatch) => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      dispatch({
        type: USER_SET_USER,
        payload: {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL
        }
      });
    } else {
      dispatch({ type: USER_SET_USER, payload: null });
    }
  });
};

const getUserProfile = (dispatch) => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      const docRef = doc(firebaseFirestore, 'users', user.uid);
      getDoc(docRef)
        .then((data) => {
          if (data.exists()) {
            dispatch({ type: USER_SET_USER, payload: data.data() });
          }
        });
    }
  });
};

const setUserActionCreator = (payload) => ({
  type: USER_SET_USER, payload,
});

const setUserAuthError = (payload) => ({ type: USER_SET_AUTH_ERROR, payload });

const signUpUserActionCreator = (email, password) => {
  return (dispatch) => {
    return signUp(email, password)
      .then(({ user }) => {
        const usersCollection = doc(collection(firebaseFirestore, 'users'), user.uid);
        setDoc(usersCollection, authFields);
      })
      .then(() => currentUserHandler(dispatch))
      .then(() => getUserProfile(dispatch))
      .catch((error) => dispatch({ type: USER_SET_AUTH_ERROR, payload: error.message }));
  };
};

const signInUserActionCreator = (email, password) => {
  return (dispatch) => {
    return signIn(email, password)
      .then(() => {
        currentUserHandler(dispatch);
      })
      .then((uid) => getUserProfile(dispatch, uid))
      .catch((error) => {
        dispatch({ type: USER_SET_AUTH_ERROR, payload: error.message });
      });
  };
};

const signOutUserActionCreator = () => {
  return (dispatch) => {
    return logout()
      .then(() => {
        currentUserHandler(dispatch);
      });
  };
};

export { setUserActionCreator, signUpUserActionCreator, signInUserActionCreator, signOutUserActionCreator, setUserAuthError };
