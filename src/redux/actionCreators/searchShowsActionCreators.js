import { SEARCH_SHOWS_SET_SHOWS, SEARCH_SHOWS_SET_IS_LOAD } from '../constants';
import { getShowByQuery } from '../../utils/getDataFromServer';

const setSearchShowsActionCreator = (payload) => ({
  type: SEARCH_SHOWS_SET_SHOWS, payload
});

const setSearchShowsIsLoadActionCreator = (payload) => ({
  type: SEARCH_SHOWS_SET_IS_LOAD, payload
});

const getSearchShowsActionCreator = (query) => {
  return (dispatch) => {
    return getShowByQuery(query)
      .then((shows) => dispatch(setSearchShowsActionCreator(shows)));
  };
};

export { setSearchShowsIsLoadActionCreator, getSearchShowsActionCreator };
