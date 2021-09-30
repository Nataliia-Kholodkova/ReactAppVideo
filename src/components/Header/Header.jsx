import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import NavigationList from '../UI/NavigationList/NavigationList';
import BurgerButton from '../UI/BurgerButton/BurgerButton';
import { setFilterByQueryActionCreator } from '../../redux/actionCreators/filtersActionCreators';
import styles from './Header.module.css';

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
        <BurgerButton onClick={onMobileMenuButtonClick} className="mobileShow" isOpened={isMobileMenuOpened} />
        <NavigationList
          isMobileMenuOpened={isMobileMenuOpened}
          showQuery={query}
          searchShowHandler={searchShowHandler}
          mobileClose={onMobileMenuButtonClick}
        />
      </nav>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSearchQuery: (query) => dispatch(setFilterByQueryActionCreator(query))
});

const mapStateToProps = (state) => {
  const { filters } = state;
  return {
    query: filters.searchQuery,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
