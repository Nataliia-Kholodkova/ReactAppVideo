import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import SearchSvg from '../../Image/SVG/Search';
import { AuthContext } from '../../../context/userAuthContext';
import styles from './NavigationList.module.css';

const NavigationList = ({
  isMobileMenuOpened,
  showQuery,
  searchShowHandler,
}) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <ul
        className={`${styles.navList} ${
          isMobileMenuOpened ? `${styles.navListOpen}` : ''
        }`}
      >
        <li className={styles.navItem}>
          <Input
            type="search"
            name="movieTitle"
            value={showQuery}
            onChange={searchShowHandler}
            placeholder="Search shows"
            className="label"
          >
            <SearchSvg />
          </Input>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/shows"
            className={styles.navLink}
            activeClassName={styles.navLinkActive}
          >
            All Shows
          </NavLink>
        </li>
        {!currentUser?.uid && (
          <>
            <li className={`${styles.navItem} ${styles.navItemLink}`}>
              <NavLink to={{
                pathname: '/signin',
                state: { modal: true }
              }}
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              >
                Sign In
              </NavLink>
            </li>
            <li className={`${styles.navItem} ${styles.navItemLink}`}>
              <NavLink to={{
                pathname: '/signup',
                state: { modal: true }
              }}
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        {currentUser?.uid && (
          <>
            <li className={`${styles.navItem} ${styles.navItemLink}`}>
              <NavLink to={{
                pathname: '/signout',
                state: { modal: true }
              }}
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              >
                Sign Out
              </NavLink>
            </li>
            <li className={`${styles.navItem} ${styles.navItemLink}`}>
              <NavLink
                to={`/profile/${currentUser.uid}`}
                className={styles.userLink}
                activeClassName={styles.userLinkActive}
              >
                {currentUser.displayName}
              </NavLink>
            </li>
          </>)}
        </ul>
    </>
  );
};

export default NavigationList;
