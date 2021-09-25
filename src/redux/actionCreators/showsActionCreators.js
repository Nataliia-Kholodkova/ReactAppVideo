import { SHOWS_SET_SHOWS, SHOWS_SET_IS_LOAD, SHOWS_SET_PAGE, SHOWS_SOULD_LOAD, SHOWS_SET_LAST_INDEX } from '../constants';
import { getShows } from '../../utils/getDataFromServer';

const setShowsActionCreator = (payload) => ({
  type: SHOWS_SET_SHOWS, payload
});

const setShowsLastIndexActionCreator = (payload) => ({
  type: SHOWS_SET_LAST_INDEX, payload
});

const setShowsIsLoadActionCreator = (payload) => ({
  type: SHOWS_SET_IS_LOAD, payload
});

const setShowsPageActionCreator = (payload) => ({
  type: SHOWS_SET_PAGE, payload
});

const setShowsShouldLoadActionCreator = (payload) => ({
  type: SHOWS_SOULD_LOAD, payload
});

const getShowsActionCreator = (page) => {
  return (dispatch) => {
    return getShows(page)
      .then((shows) => dispatch({ type: SHOWS_SET_SHOWS, payload: shows }));
  };
};

export { setShowsActionCreator, setShowsIsLoadActionCreator, setShowsPageActionCreator, getShowsActionCreator, setShowsShouldLoadActionCreator, setShowsLastIndexActionCreator };
