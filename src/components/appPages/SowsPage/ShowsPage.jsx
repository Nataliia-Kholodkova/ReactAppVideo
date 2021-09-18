import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setShowsPageActionCreator, setShowsIsLoadActionCreator, getShowsActionCreator } from '../../../redux/actionCreators/showsActionCreators';

import Shows from '../../Shows/Shows';

const ShowsPage = ({ isLoad, shows, page, setShowsLoad, setShows }) => {
  const firstMount = useRef(true);
  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      if (shows.length > 0) {
        return;
      }
    }
    setShowsLoad(true);
    setShows(page)
      .finally(() => {
        setShowsLoad(false);
      });
  }, [page]);

  return <Shows shows={shows} isLoad={isLoad} />;
};

const mapDispatchToProps = (dispatch) => {
  const setShows = (page) => dispatch(getShowsActionCreator(page));
  const setShowsLoad = (flag) => dispatch(setShowsIsLoadActionCreator(flag));
  const setPage = (page) => dispatch(setShowsPageActionCreator(page));

  return {
    setShows,
    setPage,
    setShowsLoad
  };
};

const mapStateToProps = (state) => ({ ...state.shows });

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPage);
