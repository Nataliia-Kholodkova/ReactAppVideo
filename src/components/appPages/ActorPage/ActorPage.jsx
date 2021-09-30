import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ActorBig from '../../ActorBig/ActorBig';
import Preloader from '../../UI/Preloader/Preloader';
import Error from '../Error/Error';
import { setActorIsLoadActionCreator, getActorActionCreator, setActorCastIsLoadActionCreator, getActorCastActionCreator } from '../../../redux/actionCreators/actorActionCreators';

const ActorPage = ({
  actor, setActor,
  setActorLoad,
  setActorCast,
  setActorCastLoad
}) => {
  const { actorId } = useParams();
  const { loadError, setLoadError } = useState(null);

  useEffect(() => {
    setActorLoad(true);
    setActorCastLoad(true);
    setActor(actorId)
      .catch((error) => setLoadError(`Server error: ${error.message}`))
      .finally(() => setActorLoad(false));
    setActorCast(actorId)
      .catch((error) => error)
      .finally(() => setActorCastLoad(false));
  }, []);

  return (<>
    {loadError && <Error error={loadError} />}
    <main className="main mainSingle">
      {(actor.isLoad || actor.isCastLoad)
        ? <Preloader className="preloader" />
        : <>{!loadError && <ActorBig actor={actor.actor} cast={actor.cast} />}</>}
    </main></>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setActor: (id) => dispatch(getActorActionCreator(id)),
  setActorLoad: (flag) => dispatch(setActorIsLoadActionCreator(flag)),
  setActorCast: (id) => dispatch(getActorCastActionCreator(id)),
  setActorCastLoad: (flag) => dispatch(setActorCastIsLoadActionCreator(flag)),
});

const mapStateToProps = (state) => ({ actor: state.actor });

export default connect(mapStateToProps, mapDispatchToProps)(ActorPage);
