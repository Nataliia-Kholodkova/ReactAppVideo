import { ACTORS_SET_ACTORS, ACTORS_SET_IS_LOAD } from '../constants';

const initialState = {
  actors: [],
  isLoad: false,
};

const actorsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case ACTORS_SET_ACTORS:
      newState.actors = [...payload];
      break;
    case ACTORS_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    default: break;
  }
  return newState;
};

export default actorsReducer;
