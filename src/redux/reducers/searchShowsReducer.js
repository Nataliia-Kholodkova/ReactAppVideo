import { SEARCH_SHOWS_SET_SHOWS, SEARCH_SHOWS_SET_IS_LOAD } from '../constants';

const initialState = {
  shows: [],
  isLoad: false,
};

const searchShowsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case SEARCH_SHOWS_SET_SHOWS:
      newState.shows = payload;
      break;
    case SEARCH_SHOWS_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    default: break;
  }
  return newState;
};

export default searchShowsReducer;
