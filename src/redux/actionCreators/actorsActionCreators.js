import { ACTORS_ADD_ACTORS, ACTORS_SET_IS_LOAD } from '../constants';

const setActorsActionCreator = (payload) => ({
  type: ACTORS_ADD_ACTORS, payload
});

const setActorsIsLoadActionCreator = (payload) => ({
  type: ACTORS_SET_IS_LOAD, payload
});

export { setActorsActionCreator,  setActorsIsLoadActionCreator };


