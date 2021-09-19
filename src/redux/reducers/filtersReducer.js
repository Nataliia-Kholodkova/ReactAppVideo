import { FILTER_SET_GENRE, FILTER_SET_RATING_SORT, FILTER_SET_PREMIER_DATE, FILTER_SET_QUERY, FILTER_SET_ACTOR_QUERY } from '../constants';

const initialState = {
  genres: [],
  rating: 'random',
  premierDate: 'random',
  searchQuery: '',
  actorSearchQuery: '',
};

const filtersReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case FILTER_SET_GENRE:
      newState.genres = [...payload];
      break;
    case FILTER_SET_RATING_SORT:
      newState.rating = payload;
      break;
    case FILTER_SET_PREMIER_DATE:
      newState.premierDate = payload;
      break;
    case FILTER_SET_QUERY:
      newState.searchQuery = payload;
      break;
    case FILTER_SET_ACTOR_QUERY:
      newState.actorSearchQuery = payload;
      break;
    default:
      break;
  }
  return newState;
};

export default filtersReducer;
