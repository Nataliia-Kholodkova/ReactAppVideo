import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActorIsLoadActionCreator, getActorActionCreator, setActorCastIsLoadActionCreator, getActorCastActionCreator } from '../../../redux/actionCreators/actorActionCreators';
import ActorBig from '../../ActorBig/ActorBig';

const ActorPage = ({
  actor, setActor,
  setActorLoad,
  setActorCast,
  setActorCastLoad
}) => {
  const { actorId } = useParams();
  useEffect(() => {
    setActorLoad(true);
    setActor(actorId)
      .finally(() => setActorLoad(false));
  }, [actorId]);
  useEffect(() => {
    setActorCastLoad(true);
    setActorCast(actorId)
      .finally(() => setActorCastLoad(false));
  }, [actorId]);
  return <ActorBig actor={actor.actor} cast={actor.cast} />;
};

const mapDispatchToProps = (dispatch) => {
  const setActor = (id) => dispatch(getActorActionCreator(id));
  const setActorLoad = (flag) => dispatch(setActorIsLoadActionCreator(flag));
  const setActorCast = (id) => dispatch(getActorCastActionCreator(id));
  const setActorCastLoad = (flag) => dispatch(setActorCastIsLoadActionCreator(flag));

  return {
    setActor,
    setActorLoad,
    setActorCast,
    setActorCastLoad,
  };
};

const mapStateToProps = (state) => ({ actor: state.actor });

export default connect(mapStateToProps, mapDispatchToProps)(ActorPage);
