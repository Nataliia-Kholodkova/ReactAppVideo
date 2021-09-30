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
  mobileClose
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
            onClick={() => mobileClose()}
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
              onClick={() => mobileClose()}
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
              onClick={() => mobileClose()}
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        {currentUser?.uid && (
          <>
            <li className={styles.navItem}>
              <NavLink
                to="/users"
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
                onClick={() => mobileClose()}
              >
                All Users
              </NavLink>
            </li>
            <li className={`${styles.navItem} ${styles.navItemLink}`}>
              <NavLink to={{
                pathname: '/signout',
                state: { modal: true }
              }}
              activeClassName={styles.navLinkActive}
              className={styles.navLink}
              onClick={() => mobileClose()}
              >
                Sign Out
              </NavLink>
            </li>
            <li className={`${styles.navItem} ${styles.navItemLink}`}>
              <NavLink
                to={`/profile/${currentUser.uid}`}
                className={styles.userLink}
                activeClassName={styles.userLinkActive}
                onClick={() => mobileClose()}
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
