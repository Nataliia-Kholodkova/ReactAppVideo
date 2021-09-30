import React, { useContext } from 'react';
import { AuthContext } from '../../context/userAuthContext';
import { connect } from 'react-redux';
import ShowSmall from '../ShowSmall/ShowSmall';
import Preloader from '../UI/Preloader/Preloader';
import { useSortedAndSelectedShows } from '../../customHooks/useFilterShows';
import { setFilterByGenreActionCreator } from '../../redux/actionCreators/filtersActionCreators';

const Shows = ({ shows, isLoad, genres, rating, premierDate, setFilter }) => {
  const newShows = useSortedAndSelectedShows(shows, genres, rating, premierDate);
  const { currentUser, currentUserProfile } = useContext(AuthContext);
  const { likedShows } = currentUserProfile || [];

  return (
    <>
      {newShows.length > 0 && newShows.map((show) => <ShowSmall show={show} key={show.id} setFilter={setFilter} likedShows={likedShows} user={currentUser} />)}
      {isLoad && <Preloader className="preloader" />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { genres, rating, premierDate } = state.filters;
  return { genres, rating, premierDate };
};

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setFilterByGenreActionCreator(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
