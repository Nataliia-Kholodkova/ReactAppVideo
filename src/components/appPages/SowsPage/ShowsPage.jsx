import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Shows from '../../Shows/Shows';
import Aside from '../../Aside/Aside';
import Error from '../Error/Error';
import useObserver from '../../../customHooks/useObserver';
import { setShowsPageActionCreator, setShowsIsLoadActionCreator, getShowsActionCreator, setShowsShouldLoadActionCreator, setShowsLastIndexActionCreator } from '../../../redux/actionCreators/showsActionCreators';
import { getShowsSelector } from '../../../redux/selectors';

const ShowsPage = () => {
  const lastDivRef = useRef();
  const [showsToShow, setShowsToShow] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const { isLoad, shows, shouldLoad, page, lastIndex } = useSelector(getShowsSelector);
  const dispatch = useDispatch();

  useObserver(lastDivRef, isLoad, () => {
    if (shows.length > 0) {
      if (lastIndex + 10 > shows.length) {
        dispatch(setShowsPageActionCreator(page + 1));
      } else {
        dispatch(setShowsIsLoadActionCreator(true));
        setShowsToShow([...showsToShow, ...shows.slice(lastIndex, lastIndex + 10)]);
        dispatch(setShowsLastIndexActionCreator(lastIndex + 10));
        dispatch(setShowsIsLoadActionCreator(false));
      }
    }
  });

  useEffect(() => {
    if (shouldLoad) {
      dispatch(setShowsIsLoadActionCreator(true));
      dispatch(getShowsActionCreator(page))
        .catch((error) => {
          setLoadError(`Server error: ${error.message}`);
        })
        .finally(() => {
          dispatch(setShowsIsLoadActionCreator(false));
        });
    }
    dispatch(setShowsShouldLoadActionCreator(true));
    return () => {
      dispatch(setShowsShouldLoadActionCreator(false));
      dispatch(setShowsLastIndexActionCreator(0));
      dispatch(setShowsPageActionCreator(0));
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

export default ShowsPage;
