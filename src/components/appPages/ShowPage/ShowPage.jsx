import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ShowBig from '../../ShowBig/ShowBig';
import { setShowIsLoadActionCreator, getShowActionCreator } from '../../../redux/actionCreators/showActionCreators';

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

const mapDispatchToProps = (dispatch) => ({
  setShow: (id) => dispatch(getShowActionCreator(id)),
  setShowLoad: (flag) => dispatch(setShowIsLoadActionCreator(flag)),
});

const mapStateToProps = (state) => ({ ...state.show });

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);
