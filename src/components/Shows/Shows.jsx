import React from 'react';
import { connect } from 'react-redux';
import { useSortedAndSelectedShows } from '../../customHooks/useFilterShows';
import { setFilterByGenreActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import ShowSmall from '../ShowSmall/ShowSmall';
import Preloader from '../UI/Preloader/Preloader';

const Shows = ({ shows, isLoad, genres, rating, premierDate, setFilter }) => {
  const newShows = useSortedAndSelectedShows(shows, genres, rating, premierDate);

  return (
    <>
      {newShows.map((show) => <ShowSmall show={show} key={show.id} setFilter={setFilter} />)}
      {isLoad && <Preloader className="preloader" />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { genres, rating, premierDate } = state.filters;
  return { genres, rating, premierDate };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (filter) => dispatch(setFilterByGenreActionCreator(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
