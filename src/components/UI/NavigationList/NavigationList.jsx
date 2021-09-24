import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Input from '../Input/Input';
import styles from './NavigationList.module.css';
import SearchSvg from '../../Image/SVG/Search';
import { signOutUserActionCreator } from '../../../redux/actionCreators/userActionCreators';
import SignInPage from '../../appPages/SingInPage/SignInPage';
import SignUpPage from '../../appPages/SignUpPage/SignUpPage';
import SignOutPage from '../../appPages/SignOutPage/SignOutPage';
import { AuthContext } from '../../../context/userAuthContext';
import { logout } from '../../../firebaseConf/authUser';

const NavigationList = ({
  isMobileMenuOpened,
  showQuery,
  searchShowHandler,
  signout,
}) => {
  const [isVisibleSignIn, setIsVisibleSignIn] = useState(false);
  const [isVisibleSignUp, setIsVisibleSignUp] = useState(false);
  const [isVisibleSignOut, setIsVisibleSignOut] = useState(false);
  const [active, setActive] = useState(false);
  const user = useContext(AuthContext);
  const onClichAuthLink = (event, fn, logOut = false) => {
    event.preventDefault();
    fn(true);
    if (logOut) {
      logout();
    }
  };
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
        {!user?.uid && (
          <>
          <li className={`${styles.navItem} ${styles.navItemLink}`}>
            <a
              className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                onClick={(event) => {
                  onClichAuthLink(event, setIsVisibleSignIn);
                }}
            >
              Sign In
            </a>
          </li>
        <li className={`${styles.navItem} ${styles.navItemLink}`}>
            <a
              className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              onClick={(event) => {
                onClichAuthLink(event, setIsVisibleSignUp);
              }}
            >
              Sign Up
            </a>
          </li>
            </>
        )}
        {user?.uid && (
          <li className={`${styles.navItem} ${styles.navItemLink}`}>
            <a
              className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
              onClick={(event) => {
                onClichAuthLink(event, setIsVisibleSignOut, true);
              }}
            >
              Sign Out
            </a>
          </li>)}
        </ul>
      <SignInPage isVisible={isVisibleSignIn} setIsVisible={setIsVisibleSignIn} setLincActive={setActive} />
      <SignUpPage isVisible={isVisibleSignUp} setIsVisible={setIsVisibleSignUp} setLincActive={setActive} />
      <SignOutPage isVisible={isVisibleSignOut} setIsVisible= {setIsVisibleSignOut} setLincActive={setActive} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signOutUserActionCreator()),
});

export default connect(null, mapDispatchToProps)(NavigationList);
