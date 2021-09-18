import { ACTOR_SET_ACTOR, ACTOR_SET_IS_LOAD } from '../constants';

const setActorActionCreator = (payload) => ({
  type: ACTOR_SET_ACTOR, payload
});

const setActorIsLoadActionCreator = (payload) => ({
  type: ACTOR_SET_IS_LOAD, payload
});

export { setActorActionCreator,  setActorIsLoadActionCreator };


