import { USER_SET_AUTH_ERROR, USER_SET_PROFILE_PHOTO_ERROR, USER_SET_PROFILE_INITIALS_ERROR, USER_SET_PROFILE_DATA_ERROR } from '../constants';

const initialState = {
  authError: null,
  photoError: null,
  initialsError: null,
  profileError: null,
};
const userReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case USER_SET_AUTH_ERROR:
      newState.authError = payload;
      break;
    case USER_SET_PROFILE_PHOTO_ERROR:
      newState.photoError = payload;
      break;
    case USER_SET_PROFILE_INITIALS_ERROR:
      newState.initialsError = payload;
      break;
    case USER_SET_PROFILE_DATA_ERROR:
      newState.profileError = payload;
      break;
    default:
      break;
  }
  return newState;
};

export default userReducer;
