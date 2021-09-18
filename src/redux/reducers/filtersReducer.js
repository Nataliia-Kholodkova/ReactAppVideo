import { FILTER_SET_ACTOR, FILTER_SET_GENRE, FILTER_SET_RATING_SORT } from '../constants';


const initialState = {
  actor: null,
  genre: '',
  rating: 'random',
};

export default filtersReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case FILTER_SET_ACTOR:
      newState.actor = {...payload};
      break;
    case FILTER_SET_GENRE:
      newState.genre = payload;
      break;
    case FILTER_SET_RATING_SORT:
      newState.rating = payload;
    default: break;
  }
};
