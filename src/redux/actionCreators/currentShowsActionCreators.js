import { CURRENT_SHOWS_SET_SHOWS, CURRENT_SHOWS_SET_IS_LOAD } from '../constants';
import { getCurrentShows } from '../../utils/getDataFromServer';

const setCurrentShowsActionCreator = (payload) => ({
  type: CURRENT_SHOWS_SET_SHOWS, payload
});

const setCurrentShowsIsLoadActionCreator = (payload) => ({
  type: CURRENT_SHOWS_SET_IS_LOAD, payload
});

const getCurrentShowsActionCreator = (date) => {
  return (dispatch) => {
    return getCurrentShows(date)
      .then((shows) => dispatch(setCurrentShowsActionCreator(shows)));
  };
};

export { setCurrentShowsIsLoadActionCreator, getCurrentShowsActionCreator };
