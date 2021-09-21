import { CURRENT_SHOWS_SET_SHOWS, CURRENT_SHOWS_SET_IS_LOAD } from '../constants';

const initialState = {
  shows: [],
  isLoad: false,
};

const currentShowsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case CURRENT_SHOWS_SET_SHOWS:
      newState.shows = [...payload];
      break;
    case CURRENT_SHOWS_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    default: break;
  }
  return newState;
};

export default currentShowsReducer;
