import { combineReducers } from 'redux';
import showsReducer from './showsReducer';
import showReducer from './showReducer';
import actorReducer from './actorReducer';
import filtersReducer from './filtersReducer';
import searchShowsReducer from './searchShowsReducer';
import currentShowsReducer from './currentShowsReducer';

const rootReducer = combineReducers({
  shows: showsReducer,
  currentShows: currentShowsReducer,
  searchedShows: searchShowsReducer,
  show: showReducer,
  actor: actorReducer,
  filters: filtersReducer,
});

export default rootReducer;
