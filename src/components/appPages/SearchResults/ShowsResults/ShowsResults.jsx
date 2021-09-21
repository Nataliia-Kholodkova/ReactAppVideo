import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSearchShowsIsLoadActionCreator, getSearchShowsActionCreator } from '../../../../redux/actionCreators/searchShowsActionCreators';
import Aside from '../../../Aside/Aside';
import Shows from '../../../Shows/Shows';

const ShowsPage = ({ showsState, query, setShowsLoad, setShows }) => {
  const { isLoad, shows } = showsState;

  useEffect(() => {
    setShowsLoad(true);
    setShows(query)
      .finally(() => {
        setShowsLoad(false);
      });
  }, [query]);

  if (shows.length === 0) {
    return null;
  }

  return (
    <>
      <Aside />
      <main className="main mainAside">
        <Shows shows={shows} isLoad={isLoad} />
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setShows = (query) => dispatch(getSearchShowsActionCreator(query));
  const setShowsLoad = (flag) => dispatch(setSearchShowsIsLoadActionCreator(flag));

  return {
    setShows,
    setShowsLoad
  };
};

const mapStateToProps = (state) => {
  const { searchedShows, filters } = state;
  return {
    showsState: searchedShows,
    query: filters.searchQuery,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPage);
