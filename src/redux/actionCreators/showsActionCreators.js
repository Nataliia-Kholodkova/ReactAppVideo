import { SHOWS_ADD_SHOWS, SHOWS_SET_IS_LOAD, SHOWS_SET_PAGE, SHOWS_IS_FROM_SEARCH } from '../constants';

const setShowsActionCreator = (payload) => ({
  type: SHOWS_ADD_SHOWS, payload
});

const setShowsIsLoadActionCreator = (payload) => ({
  type: SHOWS_SET_IS_LOAD, payload
});

const setShowsPageActionCreator = (payload) => ({
  type: SHOWS_SET_PAGE, payload
});

const setShowsFromSearchActionCreator = (payload) => ({
  type: SHOWS_IS_FROM_SEARCH, payload
});

export { setShowsActionCreator, setShowsFromSearchActionCreator, setShowsIsLoadActionCreator, setShowsPageActionCreator };


