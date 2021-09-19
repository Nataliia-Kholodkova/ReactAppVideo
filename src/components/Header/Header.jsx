import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterByQueryActionCreator, setFilterActorsByQueryActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import styles from './Header.module.css';

const Header = ({ query, actorsQuery, setSearchQuery, setSearchActorsQuery }) => {
  const searchShowHandler = ({ target }) => {
    const urlToPush = target.value
      ? `/search/shows/${target.value}`
      : '/';
    setSearchQuery(target.value);
    hist.push(urlToPush);
  };
  const searchActorHandler = ({ target }) => {
    const urlToPush = target.value
      ? `/search/actors/${target.value}`
      : '/';
    setSearchActorsQuery(target.value);
    hist.push(urlToPush);
  };
  const hist = useHistory();
  return (
    <header className={styles.header}>
      <nav>
        <NavLink to="/">Home</NavLink>
        <input type="search" name="movieTitle" value={query} onChange={(event) => searchShowHandler(event)} placeholder="Search shows" />
        <input type="search" name="actorTitle" value={actorsQuery} onChange={(event) => searchActorHandler(event)} placeholder="Search actors" />
        <NavLink to="/signin">Sign In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setSearchQuery = (query) => dispatch(setFilterByQueryActionCreator(query));
  const setSearchActorsQuery = (query) => dispatch(setFilterActorsByQueryActionCreator(query));

  return {
    setSearchQuery,
    setSearchActorsQuery
  };
};

const mapStateToProps = (state) => {
  const { filters } = state;
  return {
    query: filters.searchQuery,
    actorsQuery: filters.actorSearchQuery
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
