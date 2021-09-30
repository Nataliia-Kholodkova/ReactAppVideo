import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Shows from '../../Shows/Shows';
import Aside from '../../Aside/Aside';
import Error from '../Error/Error';
import useObserver from '../../../customHooks/useObserver';
import { setShowsPageActionCreator, setShowsIsLoadActionCreator, getShowsActionCreator, setShowsShouldLoadActionCreator, setShowsLastIndexActionCreator } from '../../../redux/actionCreators/showsActionCreators';

const ShowsPage = ({ isLoad, shows, shouldLoad, page, lastIndex, setShowsLoad, setShows, setPage, setShowsShouldLoad, setShowsLastIndex }) => {
  const lastDivRef = useRef();
  const [showsToShow, setShowsToShow] = useState([]);
  const [loadError, setLoadError] = useState(null);

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

  useEffect(() => {
    if (shouldLoad) {
      setShowsLoad(true);
      setShows(page)
        .catch((error) => {
          setLoadError(`Server error: ${error.message}`);
        })
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
      {(loadError && shows.length === 0) && <Error error={loadError} />}
      <Aside />
      <main className="main mainAside">
        <Shows shows={showsToShow} isLoad={isLoad} />
        {!loadError && <div className="lastDiv" ref={lastDivRef}></div>}
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setShows: (page) => dispatch(getShowsActionCreator(page)),
  setShowsLoad: (flag) => dispatch(setShowsIsLoadActionCreator(flag)),
  setShowsShouldLoad: (flag) => dispatch(setShowsShouldLoadActionCreator(flag)),
  setPage: (page) => dispatch(setShowsPageActionCreator(page)),
  setShowsLastIndex: (index) => dispatch(setShowsLastIndexActionCreator(index)),
});

const mapStateToProps = (state) => ({ ...state.shows });

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPage);
