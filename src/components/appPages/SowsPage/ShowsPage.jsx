import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { setShowsPageActionCreator, setShowsIsLoadActionCreator, getShowsActionCreator, setShowsShouldLoadActionCreator } from '../../../redux/actionCreators/showsActionCreators';
import useObserver from '../../../customHooks/useObserver';

import Shows from '../../Shows/Shows';
import Aside from '../../Aside/Aside';

const ShowsPage = ({ isLoad, shows, shouldLoad, page, setShowsLoad, setShows, setPage, setShowsShouldLoad }) => {
  const lastDivRef = useRef();
  useObserver(lastDivRef, isLoad, () => { setPage(page + 1); });

  useEffect(() => {
    if (shouldLoad) {
      setShowsLoad(true);
      setShows(page)
        .finally(() => {
          setShowsLoad(false);
        });
    }
    setShowsShouldLoad(true);
    return () => {
      setShowsShouldLoad(false);
    };
  }, [page]);

  return (
    <>
      <Aside />
      <main className="main mainAside">
        <Shows shows={shows} isLoad={isLoad} />
        <div className="lastDiv" ref={lastDivRef}></div>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setShows = (page) => dispatch(getShowsActionCreator(page));
  const setShowsLoad = (flag) => dispatch(setShowsIsLoadActionCreator(flag));
  const setShowsShouldLoad = (flag) => dispatch(setShowsShouldLoadActionCreator(flag));
  const setPage = (page) => dispatch(setShowsPageActionCreator(page));

  return {
    setShows,
    setPage,
    setShowsLoad,
    setShowsShouldLoad,
  };
};

const mapStateToProps = (state) => ({ ...state.shows });

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPage);
