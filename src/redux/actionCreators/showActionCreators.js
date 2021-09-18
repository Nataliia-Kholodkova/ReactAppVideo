import { SHOW_SET_SHOW, SHOW_SET_IS_LOAD } from '../constants';

const setShowActionCreator = (payload) => ({
  type: SHOW_SET_SHOW, payload
});

const setShowIsLoadActionCreator = (payload) => ({
  type: SHOW_SET_IS_LOAD, payload
});

export { setShowActionCreator,  setShowIsLoadActionCreator };


