import { USER_SET_USER, USER_SET_AUTH_ERROR } from '../constants';

const initialState = {
  user: null,
  error: null,
};
const userReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case USER_SET_USER:
      newState.user = payload ? { ...newState.user, ...payload } : payload;
      newState.error = null;
      break;
    case USER_SET_AUTH_ERROR:
      newState.error = payload;
      break;
    default:
      break;
  }
  return newState;
};

export default userReducer;
