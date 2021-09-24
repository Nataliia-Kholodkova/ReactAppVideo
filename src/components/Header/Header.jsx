import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilterByQueryActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import styles from './Header.module.css';
import NavigationList from '../UI/NavigationList/NavigationList';
import BurgerButton from '../UI/BurgerButton/BurgerButton';

const Header = ({ query, setSearchQuery }) => {
  const searchShowHandler = (value) => {
    const urlToPush = value
      ? `/search/shows/${value}`
      : '/';
    setSearchQuery(value);
    hist.push(urlToPush);
  };

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
        />
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
