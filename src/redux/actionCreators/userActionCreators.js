import { USER_SET_AUTH_ERROR, USER_SET_PROFILE_INITIALS_ERROR, USER_SET_PROFILE_DATA_ERROR, USER_SET_PROFILE_PHOTO_ERROR } from '../constants';
import { signUp, signIn } from '../../firebaseConf/authUser';
import { doc, setDoc, collection, updateDoc } from 'firebase/firestore';
import { firebaseFirestore } from '../../firebaseConf/firebaseConf';
import { updateProfile } from 'firebase/auth';
import authFields from '../../utils/authFields';
import { updatePhoto, createInitials, constructFields } from '../../utils/updateProfile';

const setUserAuthError = (payload) => ({ type: USER_SET_AUTH_ERROR, payload });

const signUpUserActionCreator = (email, password) => {
  return (dispatch) => {
    return signUp(email, password)
      .then(({ user }) => {
        const usersCollection = doc(collection(firebaseFirestore, 'users'), user.uid);
        setDoc(usersCollection, authFields);
      })
      .catch((error) => dispatch({ type: USER_SET_AUTH_ERROR, payload: error.message }));
  };
};

const signInUserActionCreator = (email, password) => {
  return (dispatch) => {
    return signIn(email, password)
      .catch((error) => {
        dispatch({ type: USER_SET_AUTH_ERROR, payload: error.message });
      });
  };
};

const updateProfilePhotoActionCreator = (user, photo) => {
  return (dispatch) => {
    updatePhoto(user, photo)
      .catch((error) => {
        console.log('here');
        dispatch({ type: USER_SET_PROFILE_PHOTO_ERROR, payload: error.message });
      });
  };
};

const updateProfileInitialsActionCreator = (firstName, lastName, user) => {
  return (dispatch) => {
    const initials = createInitials(firstName, lastName);
    if (initials) {
      return updateProfile(user, {
        displayName: initials,
      })
        .catch((error) => dispatch({ type: USER_SET_PROFILE_INITIALS_ERROR, payload: error.message }));
    }
    return Promise.resolve();
  };
};

const updateUserProfileData = (user, firstName, lastName, gender) => {
  return (dispatch) => {
    const updateFields = constructFields(firstName, lastName, gender);
    if (Object.keys(updateFields).length > 0) {
      const usersCollection = doc(firebaseFirestore, 'users', user.uid);
      return updateDoc(usersCollection, updateFields)
        .catch((error) => dispatch({ type: USER_SET_PROFILE_DATA_ERROR, payload: error.message }));
    };
    return Promise.resolve();
  };
};

const updateFavouriteShows = (user, shows) => {
  return (dispatch) => {
    const usersCollection = doc(firebaseFirestore, 'users', user.uid);
    return updateDoc(usersCollection, { likedShows: shows })
      .catch((error) => dispatch({ type: USER_SET_PROFILE_DATA_ERROR, payload: error.message }));
  };
};

export {
  signUpUserActionCreator, signInUserActionCreator, setUserAuthError, updateProfilePhotoActionCreator,
  updateProfileInitialsActionCreator, updateUserProfileData, updateFavouriteShows
};
