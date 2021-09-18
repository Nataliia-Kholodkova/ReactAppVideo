import { SHOW_ADD_SHOW, SHOW_SET_IS_LOAD } from '../constants';


const initialState = {
  show: {},
  isLoad: false,
};

export default showReducer = (state = initialState, action) => {
  const newState = { ...state };
  const { type, payload } = action;
  switch (type) {
    case SHOW_ADD_SHOW:
      newState.shows = payload;
      break;
    case SHOW_SET_IS_LOAD:
      newState.isLoad = payload;
      break;
    default: break;
  }
};
