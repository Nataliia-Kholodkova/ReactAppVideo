import { ACTOR_SET_ACTOR, ACTOR_SET_IS_LOAD, ACTOR_SET_CAST, ACTOR_SET_CAST_IS_LOAD } from '../constants';
import { getActorbyId, getActorCast } from '../../utils/getDataFromServer';

const setActorActionCreator = (payload) => ({
  type: ACTOR_SET_ACTOR, payload,
});

const setActorIsLoadActionCreator = (payload) => ({
  type: ACTOR_SET_IS_LOAD, payload,
});

const setActorCastIsLoadActionCreator = (payload) => ({
  type: ACTOR_SET_CAST_IS_LOAD, payload,
});

const getActorActionCreator = (id) => {
  return (dispatch) => {
    return getActorbyId(id)
      .then((actor) => dispatch({ type: ACTOR_SET_ACTOR, payload: actor }));
  };
};

const getActorCastActionCreator = (id) => {
  return (dispatch) => {
    return getActorCast(id)
      .then((cast) => dispatch({ type: ACTOR_SET_CAST, payload: cast }));
  };
};

export { setActorActionCreator, setActorIsLoadActionCreator, getActorActionCreator, setActorCastIsLoadActionCreator, getActorCastActionCreator };
