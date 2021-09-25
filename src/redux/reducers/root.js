import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import showsReducer from './showsReducer';
import showReducer from './showReducer';
import actorReducer from './actorReducer';
import filtersReducer from './filtersReducer';
import searchShowsReducer from './searchShowsReducer';
import currentShowsReducer from './currentShowsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  shows: showsReducer,
  currentShows: currentShowsReducer,
  searchedShows: searchShowsReducer,
  show: showReducer,
  actor: actorReducer,
  user: userReducer,
  filters: filtersReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
