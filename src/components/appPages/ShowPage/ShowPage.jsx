import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ShowBig from '../../ShowBig/ShowBig';
import Preloader from '../../UI/Preloader/Preloader';
import { setShowIsLoadActionCreator, getShowActionCreator } from '../../../redux/actionCreators/showActionCreators';
import { getShowSelector } from '../../../redux/selectors';

const ShowPage = ({ setShow, setShowLoad }) => {
  const { showId } = useParams();
  const { show, isLoad } = useSelector(getShowSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowIsLoadActionCreator(true));
    dispatch(getShowActionCreator(showId))
      .finally(() => dispatch(setShowIsLoadActionCreator(false)));
  }, [showId, dispatch]);

  return (<>
    {isLoad
      ? <Preloader className="preloader" />
      : <main className="main mainSingle">
        <ShowBig show={show} />
      </main>}
  </>);
};

export default ShowPage;
