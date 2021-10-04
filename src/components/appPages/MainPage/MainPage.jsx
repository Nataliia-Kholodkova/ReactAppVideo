import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Line from '../../ShowsLine/ShowsLine';
import Preloader from '../../UI/Preloader/Preloader';
import Error from '../Error/Error';
import { useFilteredByGenreShows, useSortByPremierDateShows } from '../../../customHooks/useFilterShows';
import { setFilterByGenreActionCreator } from '../../../redux/actionCreators/filtersActionCreators';
import { setCurrentShowsIsLoadActionCreator, getCurrentShowsActionCreator } from '../../../redux/actionCreators/currentShowsActionCreators';
import genreNames from '../../../utils/genres';
import { getCurrentShowsSelector } from '../../../redux/selectors';

const MainPage = () => {
  const date = new Date().toISOString().split('T')[0];
  const [loadError, setLoadError] = useState(null);
  const { shows, isLoad } = useSelector(getCurrentShowsSelector);
  const dispatch = useDispatch();

  const setGenre = (genre) => dispatch(setFilterByGenreActionCreator(genre));

  useEffect(() => {
    dispatch(setCurrentShowsIsLoadActionCreator(true));
    dispatch(getCurrentShowsActionCreator(date))
      .catch((error) => setLoadError(`Server error: ${error.message}`))
      .finally(dispatch(setCurrentShowsIsLoadActionCreator(false)));
  }, [dispatch]);

  return (<>
    {loadError && <Error error={loadError} />}
    <main className="main mainSingle">
      {!loadError && <h1 className="mainTitle">You can watch now!</h1>}
      {isLoad
        ? <Preloader className="preloader" />
        : <>{genreNames.map((genreName) => (
          <Line
            key={genreName} genre={genreName}
            shows={useSortByPremierDateShows(useFilteredByGenreShows(shows, [genreName]), 'asc')}
            setGenre={setGenre}
            isLoad={isLoad}
          />
        ))
      }</>}
    </main>
    </>
  );
};

export default MainPage;
