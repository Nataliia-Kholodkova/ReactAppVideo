import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setActorsIsLoadActionCreator, getActorsActionCreator } from '../../../../redux/actionCreators/actorsActionCreators';
import Actors from '../../../Actors/Actors';

// import Shows from '../../../Shows/Shows';

const ActorsPage = ({ actors, isLoad, query, setActorsLoad, setActors }) => {
  useEffect(() => {
    setActorsLoad(true);
    setActors(query)
      .finally(() => {
        setActorsLoad(false);
      });
  }, [query]);

  if (actors.length === 0) {
    return null;
  }

  return <Actors actors={actors} isLoad={isLoad} />;

  // return <Shows shows={shows} isLoad={isLoad} />;
};

const mapDispatchToProps = (dispatch) => {
  const setActors = (query) => dispatch(getActorsActionCreator(query));
  const setActorsLoad = (flag) => dispatch(setActorsIsLoadActionCreator(flag));

  return {
    setActors,
    setActorsLoad
  };
};

const mapStateToProps = (state) => ({ ...state.actors, query: state.filters.actorSearchQuery });

export default connect(mapStateToProps, mapDispatchToProps)(ActorsPage);
