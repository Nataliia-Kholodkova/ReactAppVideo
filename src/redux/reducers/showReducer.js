import { SHOW_SET_SHOW, SHOW_SET_IS_LOAD } from '../constants';

const initialState = {
  show: {},
  isLoad: false,
};

const showReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case SHOW_SET_SHOW:
      newState.show = payload;
      break;
    case SHOW_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    default: break;
  }
  return newState;
};

export default showReducer;
