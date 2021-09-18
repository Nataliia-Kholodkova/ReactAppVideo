import { SHOWS_SET_SHOWS, SHOWS_SET_IS_LOAD, SHOWS_SET_PAGE } from '../constants';

const initialState = {
  shows: [],
  isLoad: false,
  page: 0,
};

const showsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case SHOWS_SET_SHOWS:
      newState.shows = [...newState.shows, ...payload];
      break;
    case SHOWS_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    case SHOWS_SET_PAGE:
      newState.page = payload;
      break;
    default: break;
  }
  return newState;
};

export default showsReducer;
