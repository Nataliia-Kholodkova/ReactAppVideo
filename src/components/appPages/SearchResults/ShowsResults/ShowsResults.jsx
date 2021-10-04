import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aside from '../../../Aside/Aside';
import Shows from '../../../Shows/Shows';
import Error from '../../Error/Error';
import { setSearchShowsIsLoadActionCreator, getSearchShowsActionCreator } from '../../../../redux/actionCreators/searchShowsActionCreators';
import { getSearchedShowsSelector, getSearchedQuerySelector } from '../../../../redux/selectors';

const ShowsPage = () => {
  const { isLoad, shows } = useSelector(getSearchedShowsSelector);
  const query = useSelector(getSearchedQuerySelector);
  const { loadError, setLoadError } = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchShowsIsLoadActionCreator(true));
    dispatch(getSearchShowsActionCreator(query))
      .catch((error) => setLoadError(`Server error: ${error.message}`))
      .finally(() => {
        dispatch(setSearchShowsIsLoadActionCreator(false));
      });
  }, [query, dispatch]);

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

export default ShowsPage;
