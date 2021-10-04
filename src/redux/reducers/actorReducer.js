import {
  ACTOR_SET_ACTOR,
  ACTOR_SET_IS_LOAD,
  ACTOR_SET_CAST,
  ACTOR_SET_CAST_IS_LOAD,
} from '../constants';

const initialState = {
  actor: null,
  isLoad: false,
  cast: [],
  isCastLoad: false,
};
const actorReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case ACTOR_SET_ACTOR:
      newState.actor = { ...payload };
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
