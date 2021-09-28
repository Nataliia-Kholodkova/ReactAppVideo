import React, { useContext } from 'react';
import { connect } from 'react-redux';
import ShowSmall from '../ShowSmall/ShowSmall';
import Preloader from '../UI/Preloader/Preloader';
import { useSortedAndSelectedShows } from '../../customHooks/useFilterShows';
import { setFilterByGenreActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import { AuthContext } from '../../context/userAuthContext';
import { updateFavouriteShows } from '../../firebaseConf/profileUpdate';

const Shows = ({ shows, isLoad, genres, rating, premierDate, setFilter, setLiked }) => {
  const newShows = useSortedAndSelectedShows(shows, genres, rating, premierDate);
  const { user, profile } = useContext(AuthContext);
  const { likedShows } = profile || [];
  return (
    <>
      {newShows.length > 0 && newShows.map((show) => <ShowSmall show={show} key={show.id} setFilter={setFilter} likedShows={likedShows} user={user} setLiked={updateFavouriteShows} />)}
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
