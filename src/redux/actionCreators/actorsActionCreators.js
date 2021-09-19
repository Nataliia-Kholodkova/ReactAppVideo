import { ACTORS_SET_ACTORS, ACTORS_SET_IS_LOAD } from '../constants';
import { getActors } from '../../utils/getDataFromServer';

const setActorsActionCreator = (payload) => ({
  type: ACTORS_SET_ACTORS, payload,
});

const setActorsIsLoadActionCreator = (payload) => ({
  type: ACTORS_SET_IS_LOAD, payload,
});

const getActorsActionCreator = (query) => {
  return (dispatch) => {
    return getActors(query)
      .then((actors) => dispatch({ type: ACTORS_SET_ACTORS, payload: actors }));
  };
};

export { setActorsActionCreator, setActorsIsLoadActionCreator, getActorsActionCreator };
