import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ActorBig from '../../ActorBig/ActorBig';
import Preloader from '../../UI/Preloader/Preloader';
import Error from '../Error/Error';
import { setActorIsLoadActionCreator, getActorActionCreator, setActorCastIsLoadActionCreator, getActorCastActionCreator } from '../../../redux/actionCreators/actorActionCreators';
import { getActorSelector } from '../../../redux/selectors';

const ActorPage = () => {
  const { actorId } = useParams();
  const { loadError, setLoadError } = useState(null);
  const actor = useSelector(getActorSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActorIsLoadActionCreator(true));
    dispatch(setActorCastIsLoadActionCreator(true));
    dispatch(getActorActionCreator(actorId))
      .catch((error) => setLoadError(`Server error: ${error.message}`))
      .finally(dispatch(setActorIsLoadActionCreator(false)));
    dispatch(getActorCastActionCreator(actorId))
      .catch((error) => error)
      .finally(() => dispatch(setActorCastIsLoadActionCreator(false)));
  }, [dispatch]);

  return (<>
    {loadError && <Error error={loadError} />}
    <main className="main mainSingle">
      {(actor.isLoad || actor.isCastLoad)
        ? <Preloader className="preloader" />
        : <>{!loadError && actor.actor && actor.cast.length > 0 && <ActorBig actor={actor.actor} cast={actor.cast} />}</>}
    </main></>
  );
};

export default ActorPage;
