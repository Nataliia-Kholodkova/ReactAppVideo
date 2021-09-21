import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setShowIsLoadActionCreator, getShowActionCreator } from '../../../redux/actionCreators/showActionCreators';
import ShowBig from '../../ShowBig/ShowBig';

const ShowPage = ({ show, isLoad, setShow, setShowLoad }) => {
  const { showId } = useParams();
  useEffect(() => {
    setShowLoad(true);
    setShow(showId)
      .finally(() => setShowLoad(false));
  }, [showId]);
  return (
    <main className="main mainSingle">
      <ShowBig show={show} />
    </main>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setShow = (id) => dispatch(getShowActionCreator(id));
  const setShowLoad = (flag) => dispatch(setShowIsLoadActionCreator(flag));

  return {
    setShow,
    setShowLoad
  };
};

const mapStateToProps = (state) => ({ ...state.show });

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
