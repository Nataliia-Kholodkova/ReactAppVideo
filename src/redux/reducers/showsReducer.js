import { SHOWS_ADD_SHOWS, SHOWS_SET_IS_LOAD, SHOWS_SET_PAGE, SHOWS_IS_FROM_SEARCH } from '../constants';


const initialState = {
  shows: [],
  isLoad: false,
  isFromSearch: false,
  page: 0,
};

export default showsReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case SHOWS_ADD_SHOWS:
      newState.shows = [...newState.shows, ...payload];
      break;
    case SHOWS_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    case SHOWS_SET_PAGE:
      newState.page = payload;
    case SHOWS_IS_FROM_SEARCH:
      newState.isFromSearch = payload;
    default: break;
  }
};
