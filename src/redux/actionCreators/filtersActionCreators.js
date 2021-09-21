import {
  FILTER_SET_GENRE, FILTER_SET_RATING_SORT, FILTER_SET_PREMIER_DATE, FILTER_SET_QUERY,
  // FILTER_SET_ACTOR_QUERY
} from '../constants';

const setFilterByGenreActionCreator = (payload) => ({
  type: FILTER_SET_GENRE, payload
});

const setFilterByRatingActionCreator = (payload) => ({
  type: FILTER_SET_RATING_SORT, payload
});

const setFilterByRPremierDateActionCreator = (payload) => ({
  type: FILTER_SET_PREMIER_DATE, payload
});

const setFilterByQueryActionCreator = (payload) => ({
  type: FILTER_SET_QUERY, payload
});

// const setFilterActorsByQueryActionCreator = (payload) => ({
//   type: FILTER_SET_ACTOR_QUERY, payload
// });

export {
  setFilterByGenreActionCreator, setFilterByRatingActionCreator, setFilterByRPremierDateActionCreator, setFilterByQueryActionCreator,
};
