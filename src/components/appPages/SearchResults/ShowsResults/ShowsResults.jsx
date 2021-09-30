import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Aside from '../../../Aside/Aside';
import Shows from '../../../Shows/Shows';
import Error from '../../Error/Error';
import { setSearchShowsIsLoadActionCreator, getSearchShowsActionCreator } from '../../../../redux/actionCreators/searchShowsActionCreators';

const ShowsPage = ({ showsState, query, setShowsLoad, setShows }) => {
  const { isLoad, shows } = showsState;
  const { loadError, setLoadError } = useState(null);

  useEffect(() => {
    setShowsLoad(true);
    setShows(query)
      .catch((error) => setLoadError(`Server error: ${error.message}`))
      .finally(() => {
        setShowsLoad(false);
      });
  }, [query]);

  if (shows.length === 0) {
    return null;
  }

  return (
    <>
      {loadError && <Error error={loadError} />}
      <Aside />
      <main className="main mainAside">
        <Shows shows={shows} isLoad={isLoad} />
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setShows: (query) => dispatch(getSearchShowsActionCreator(query)),
  setShowsLoad: (flag) => dispatch(setSearchShowsIsLoadActionCreator(flag))
}
);

const mapStateToProps = (state) => {
  const { searchedShows, filters } = state;
  return {
    showsState: searchedShows,
    query: filters.searchQuery,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsPage);
