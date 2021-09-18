import { combineReducers } from 'redux';
import showsReducer from './showsReducer';
import showReducer from './showReducer';
import actorsReducer from './actorsReducer';
import actorReducer from './actorReducer';
import filtersReducer from './filtersReducer';

const rootReducer = combineReducers({
  shows: showsReducer,
  show: showReducer,
  actors: actorsReducer,
  actor: actorReducer,
  filters: filtersReducer,
});

export default rootReducer;