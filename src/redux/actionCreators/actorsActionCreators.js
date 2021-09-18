import { ACTORS_SET_ACTORS, ACTORS_SET_IS_LOAD } from '../constants';
import { getActors } from '../../utils/getDataFromServer';

const setActorsActionCreator = (payload) => ({
  type: ACTORS_SET_ACTORS, payload,
});

const setActorsIsLoadActionCreator = (payload) => ({
  type: ACTORS_SET_IS_LOAD, payload,
});

const getActorsActionCreator = () => {
  return (dispatch) => {
    return getActors()
      .then((actors) => dispatch({ type: ACTORS_SET_ACTORS, payload: actors }));
  };
};

export { setActorsActionCreator, setActorsIsLoadActionCreator, getActorsActionCreator };
