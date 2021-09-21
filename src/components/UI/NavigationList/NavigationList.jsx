import React from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import styles from './NavigationList.module.css';

const NavigationList = ({ isMobileMenuOpened, showQuery, searchShowHandler }) => (
  <ul className={`${styles.navList} ${isMobileMenuOpened ? `${styles.navListOpen}` : ''}`}>
    <li className={styles.navItem}>
      <Input
        type="search"
        name="movieTitle"
        value={showQuery}
        onChange={searchShowHandler}
        placeholder="Search shows" />
    </li>
    <li className={styles.navItem}>
      <NavLink to="/shows" className={styles.navLink} activeClassName={styles.navLincActive}>All Shows</NavLink>
    </li>
    <li className={`${styles.navItem} ${styles.navItemLink}`}>
      <NavLink to="/signin" className={styles.navLink} activeClassName={styles.navLincActive}>Sign In</NavLink>
    </li>
    <li className={`${styles.navItem} ${styles.navItemLink}`}>
      <NavLink to="/signup" className={styles.navLink} activeClassName={styles.navLincActive}>Sign Up</NavLink>
    </li>
  </ul>
);

export default NavigationList;
