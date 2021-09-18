import { ACTOR_SET_ACTOR, ACTOR_SET_IS_LOAD } from '../constants';
import { getActorbyId } from '../../utils/getDataFromServer';

const setActorActionCreator = (payload) => ({
  type: ACTOR_SET_ACTOR, payload,
});

const setActorIsLoadActionCreator = (payload) => ({
  type: ACTOR_SET_IS_LOAD, payload,
});

const getActorActionCreator = (id) => {
  return (dispatch) => () => {
    return getActorbyId(id)
      .then((actor) => dispatch({ type: ACTOR_SET_ACTOR, payload: actor }));
  };
};

export { setActorActionCreator, setActorIsLoadActionCreator, getActorActionCreator };
