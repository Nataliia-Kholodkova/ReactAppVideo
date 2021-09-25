import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Shows from '../../Shows/Shows';
import Aside from '../../Aside/Aside';
import useObserver from '../../../customHooks/useObserver';
import { setShowsPageActionCreator, setShowsIsLoadActionCreator, getShowsActionCreator, setShowsShouldLoadActionCreator, setShowsLastIndexActionCreator } from '../../../redux/actionCreators/showsActionCreators';

const ShowsPage = ({ isLoad, shows, shouldLoad, page, lastIndex, setShowsLoad, setShows, setPage, setShowsShouldLoad, setShowsLastIndex }) => {
  const lastDivRef = useRef();
  useObserver(lastDivRef, isLoad, () => {
    if (shows.length > 0) {
      if (lastIndex + 10 > shows.length) {
        setPage(page + 1);
      } else {
        setShowsLoad(true);
        setShowsToShow([...showsToShow, ...shows.slice(lastIndex, lastIndex + 10)]);
        setShowsLastIndex(lastIndex + 10);
        setShowsLoad(false);
      }
    }
  });
  const [showsToShow, setShowsToShow] = useState([]);

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
      setShowsLastIndex(0);
    };
  }, [page]);

  return (
    <>
      <Aside />
      <main className="main mainAside">
        <Shows shows={showsToShow} isLoad={isLoad} />
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
  const setShowsLastIndex = (index) => dispatch(setShowsLastIndexActionCreator(index));

  return {
    setShows,
    setPage,
    setShowsLoad,
    setShowsShouldLoad,
    setShowsLastIndex
  };
};

const mapStateToProps = (state) => ({ ...state.shows });

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPage);
