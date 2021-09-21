import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterByQueryActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import styles from './Header.module.css';
import NavigationList from '../UI/NavigationList/NavigationList';
import BurgerButton from '../UI/BurgerButton/BurgerButton';

const Header = ({ query, setSearchQuery }) => {
  const searchShowHandler = ({ target }) => {
    const urlToPush = target.value
      ? `/search/shows/${target.value}`
      : '/';
    setSearchQuery(target.value);
    hist.push(urlToPush);
  };

  // const searchActorHandler = ({ target }) => {
  //   const urlToPush = target.value
  //     ? `/search/actors/${target.value}`
  //     : '/';
  //   setSearchActorsQuery(target.value);
  //   hist.push(urlToPush);
  // };

  const onMobileMenuButtonClick = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const hist = useHistory();
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={`${styles.navLink} ${styles.homePageLink}`} activeClassName={styles.navLincActive}>
          Home
        </NavLink>
        <BurgerButton onClick={onMobileMenuButtonClick} className="mobileShow" />
        <NavigationList
          isMobileMenuOpened={isMobileMenuOpened}
          showQuery={query}
          searchShowHandler={searchShowHandler}
          // actorsQuery={actorsQuery}
          // searchActorHandler={searchActorHandler}
        />
      </nav>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  const setSearchQuery = (query) => dispatch(setFilterByQueryActionCreator(query));
  // const setSearchActorsQuery = (query) => dispatch(setFilterActorsByQueryActionCreator(query));

  return {
    setSearchQuery,
    // setSearchActorsQuery
  };
};

const mapStateToProps = (state) => {
  const { filters } = state;
  return {
    query: filters.searchQuery,
    // actorsQuery: filters.actorSearchQuery
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
