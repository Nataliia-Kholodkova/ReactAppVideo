import { SHOW_SET_SHOW, SHOW_SET_IS_LOAD } from '../constants';
import { getShowById } from '../../utils/getDataFromServer';

const setShowActionCreator = (payload) => ({
  type: SHOW_SET_SHOW, payload
});

const setShowIsLoadActionCreator = (payload) => ({
  type: SHOW_SET_IS_LOAD, payload
});

const getShowActionCreator = (id) => {
  return (dispatch) => {
    return getShowById(id)
      .then((show) => dispatch({ type: SHOW_SET_SHOW, payload: show }));
  };
};

export { setShowActionCreator, setShowIsLoadActionCreator, getShowActionCreator };
