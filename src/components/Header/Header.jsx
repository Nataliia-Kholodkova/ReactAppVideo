import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterByQueryActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import styles from './Header.module.css';

const Header = ({ query, setSearchQuery }) => {
  const searchHandler = ({ target }) => {
    const urlToPush = target.value
      ? `/search/shows/${target.value}`
      : '/';
    setSearchQuery(target.value);
    hist.push(urlToPush);
  };
  const hist = useHistory();
  return (
    <header className={styles.header}>
      <nav>
        <NavLink to="/">Home</NavLink>
        <input type="search" name="movieTitle" value={query} onChange={(event) => searchHandler(event)} />
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setSearchQuery = (query) => dispatch(setFilterByQueryActionCreator(query));

  return {
    setSearchQuery,
  };
};

const mapStateToProps = (state) => {
  const { filters } = state;
  return {
    query: filters.searchQuery,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
