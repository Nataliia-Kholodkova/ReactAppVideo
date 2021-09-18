import { FILTER_SET_ACTOR, FILTER_SET_GENRE, FILTER_SET_RATING_SORT } from '../constants';

const setFilterByActorActionCreator = (payload) => ({
  type: FILTER_SET_ACTOR, payload
});

const setFilterByGenreActionCreator = (payload) => ({
  type: FILTER_SET_GENRE, payload
});

const setFilterByRatingActionCreator = (payload) => ({
  type: FILTER_SET_RATING_SORT, payload
});

export { setFilterByActorActionCreator, setFilterByGenreActionCreator, setFilterByRatingActionCreator };


