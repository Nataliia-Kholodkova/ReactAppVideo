import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Line from '../../ShowsLine/ShowsLine';
import Preloader from '../../UI/Preloader/Preloader';
import { useFilteredByGenreShows, useSortByPremierDateShows } from '../../../customHooks/useFilterShows';
import { setFilterByGenreActionCreator } from '../../../redux/actionCreators/filtersActionCreators';
import { setCurrentShowsIsLoadActionCreator, getCurrentShowsActionCreator } from '../../../redux/actionCreators/currentShowsActionCreators';
import genreNames from '../../../utils/genres';

const MainPage = ({ shows, isLoad, setShows, setShowsLoad, setGenre }) => {
  const date = new Date().toISOString().split('T')[0];
  useEffect(() => {
    setShowsLoad(true);
    setShows(date)
      .finally(setShowsLoad(false));
  }, []);
  return (
    <main className="main mainSingle">
      <h1 className="mainTitle">You can watch now!</h1>
      {isLoad
        ? <Preloader className="preloader" />
        : <>{genreNames.map((genreName) => (
          <Line
            key={genreName} genre={genreName}
            shows={useSortByPremierDateShows(useFilteredByGenreShows(shows, [genreName]), 'asc')
              .filter((show) => show.image)}
            setGenre={setGenre}
            isLoad={isLoad}
          />
        ))
      }</>}
    </main>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setShows = (date) => dispatch(getCurrentShowsActionCreator(date));
  const setShowsLoad = (flag) => dispatch(setCurrentShowsIsLoadActionCreator(flag));
  const setGenre = (genre) => dispatch(setFilterByGenreActionCreator(genre));

  return {
    setShows,
    setShowsLoad,
    setGenre,
  };
};

const mapStateToProps = (state) => ({ ...state.currentShows });

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
