import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setActorIsLoadActionCreator, getActorActionCreator, setActorCastIsLoadActionCreator, getActorCastActionCreator } from '../../../redux/actionCreators/actorActionCreators';
import ActorBig from '../../ActorBig/ActorBig';
import Preloader from '../../UI/Preloader/Preloader';

const ActorPage = ({
  actor, setActor,
  setActorLoad,
  setActorCast,
  setActorCastLoad
}) => {
  const { actorId } = useParams();
  useEffect(() => {
    setActorLoad(true);
    setActorCastLoad(true);
    setActor(actorId)
      .finally(() => setActorLoad(false));
    setActorCast(actorId)
      .finally(() => setActorCastLoad(false));
  }, [actorId]);
  return (
    <main className="main mainSingle">
      {actor.isLoad || actor.isCastLoad
        ? <Preloader className="preloader" />
        : <ActorBig actor={actor.actor} cast={actor.cast} />}
    </main>
  );
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
