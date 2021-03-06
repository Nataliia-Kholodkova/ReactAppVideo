import React, { useState } from 'react';
import { connect } from 'react-redux';
import Radio from '../UI/Radio/Radio';
import ArrowButton from '../UI/ArrowButton/ArrowButton';
import { setFilterByRatingActionCreator, setFilterByRPremierDateActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import styles from './Aside.module.css';

const Aside = ({ setRatingOrder, setPremierDateOrder }) => {
  const onChangeRadioDate = ({ target }) => {
    setPremierDateOrder(target.value);
  };

  const onChangeRadioRating = ({ target }) => {
    setRatingOrder(target.value);
  };

  const toggleAsideOpen = () => {
    setAsideOpened(!isAsideOpened);
  };

  const [isAsideOpened, setAsideOpened] = useState(false);

  return (
    <aside className={`${styles.aside} ${isAsideOpened ? `${styles.opened}` : ''}`}>
      <ArrowButton onClick={toggleAsideOpen} />
      <section className={styles.section}>
        <h3 className={styles.title}>Sort by premier date</h3>
        <Radio name="premierDate" value="random" title="Reset" checked onChange={onChangeRadioDate} />
        <Radio name="premierDate" value="asc" title="Acsending" onChange={onChangeRadioDate} />
        <Radio name="premierDate" value="desc" title="Descending" onChange={onChangeRadioDate}/>
      </section>
      <section className={styles.section}>
        <h3 className={styles.title}>Sort by rating</h3>
        <Radio name="rating" value="random" title="Reset" checked onChange={onChangeRadioRating} />
        <Radio name="rating" value="asc" title="Acsending" onChange={onChangeRadioRating} />
        <Radio name="rating" value="desc" title="Descending" onChange={onChangeRadioRating}/>
      </section>
    </aside>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setRatingOrder: (order) => dispatch(setFilterByRatingActionCreator(order)),
  setPremierDateOrder: (order) => dispatch(setFilterByRPremierDateActionCreator(order)),
});

export default connect(null, mapDispatchToProps)(Aside);
