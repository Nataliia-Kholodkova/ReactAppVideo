import React from 'react';
import { connect } from 'react-redux';
import { setFilterByGenreActionCreator, setFilterByRatingActionCreator, setFilterByRPremierDateActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import genreNames from '../../utils/genres';
import styles from './Aside.module.css';

// import Input from '../UI/Input/Input';
import CheckBox from '../UI/CheckBox/CheckBox';
import Radio from '../UI/Radio/Radio';

const Aside = ({ genres, rating, premierDate, setGenre, setRatingOrder, setPremierDateOrder }) => {
  const onChangeCheckBox = ({ target }) => {
    target.checked
      ? setGenre(genres.concat(target.value))
      : setGenre(genres.filter((genre) => genre !== target.value));
  };

  const onChangeRadioDate = ({ target }) => {
    setPremierDateOrder(target.value);
  };

  const onChangeRadioRating = ({ target }) => {
    setRatingOrder(target.value);
  };

  return (
    <aside className={styles.aside}>
      {/* <Input type="search" /> */}
      <div>
        <h3>Select by genres</h3>
        {genreNames.map((genreName) => <CheckBox key={genreName} name={genreName} value={genreName} title={genreName} onChange={onChangeCheckBox} />)}
      </div>
      <div>
        <h3>Sort by premier date</h3>
        <Radio name="premierDate" value="random" title="Random" checked onChange={onChangeRadioDate} />
        <Radio name="premierDate" value="asc" title="Acsending" onChange={onChangeRadioDate} />
        <Radio name="premierDate" value="desc" title="Descending" checked onChange={onChangeRadioDate}/>
      </div>
      <div>
        <h3>Sort by rating</h3>
        <Radio name="rating" value="random" title="Random" checked onChange={onChangeRadioRating} />
        <Radio name="rating" value="asc" title="Acsending" onChange={onChangeRadioRating} />
        <Radio name="rating" value="desc" title="Descending" onChange={onChangeRadioRating}/>
      </div>
    </aside>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setGenre = (genre) => dispatch(setFilterByGenreActionCreator(genre));
  const setRatingOrder = (order) => dispatch(setFilterByRatingActionCreator(order));
  const setPremierDateOrder = (order) => dispatch(setFilterByRPremierDateActionCreator(order));

  return {
    setGenre, setRatingOrder, setPremierDateOrder
  };
};

const mapStateToProps = (state) => {
  const { genres, rating, premierDate } = state.filters;
  return { genres, rating, premierDate };
};

export default connect(mapStateToProps, mapDispatchToProps)(Aside);
