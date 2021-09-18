import { ACTORS_ADD_ACTORS, ACTORS_SET_IS_LOAD } from '../constants';


const initialState = {
  actors: [],
  isLoad: false,
};

export default actorsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case ACTORS_ADD_ACTORS:
      newState.actors = [...newState.actors, ...payload];
      break;
    case ACTORS_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    default: break;
  }
};
