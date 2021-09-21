import { USER_SET_USER } from '../constants';

const initialState = {
  user: {},
};
const actorReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case USER_SET_USER:
      newState.user = { ...payload };
      break;
    case ACTOR_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    case ACTOR_SET_CAST:
      newState.cast = [...payload];
      break;
    case ACTOR_SET_CAST_IS_LOAD:
      newState.isCastLoad = payload;
      break;
    default:
      break;
  }
  return newState;
};

export default actorReducer;

