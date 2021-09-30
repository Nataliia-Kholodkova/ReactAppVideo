import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { firebaseAuth } from '../../firebaseConf/firebaseConf';
import Header from '../Header/Header';
import ShowsResults from '../appPages/SearchResults/ShowsResults/ShowsResults';
import ShowsPage from '../appPages/SowsPage/ShowsPage';
import ShowPage from '../appPages/ShowPage/ShowPage';
import ActorPage from '../appPages/ActorPage/ActorPage';
import MainPage from '../appPages/MainPage/MainPage';
import ProfilePage from '../appPages/ProfilePage/ProfilePage';
import SignUpPage from '../appPages/SignUpPage/SignUpPage';
import SignInPage from '../appPages/SingInPage/SignInPage';
import SignOutPage from '../appPages/SignOutPage/SignOutPage';
import UpdateProfile from '../appPages/UpdateProfile/UpdateProfile';
import UsersPage from '../appPages/UsersPage/UsersPage';
import UserPage from '../appPages/UserPage/UserPage';
import styles from './App.module.css';

const App = () => {
  const history = useHistory();
  const [prevLocation, setPrevLocation] = useState(history.location);
  const [isModal, setIsModal] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setAuthorized(true);
    }
    setInitialized(true);
  });

  useEffect(() => {
    history.listen((nextLocation) => {
      if (!(history.location?.state &&
        history.location?.state?.modal)) {
        setPrevLocation(nextLocation);
      }
      setIsModal(
        history.location?.state &&
        history.location?.state?.modal &&
        prevLocation.pathname !== history.location.pathname
      );
    });
  }, [history.location.pathname]);

  return (
    <>{initialized &&
      <div className={styles.root}>
        <Header />
        <>
          <Switch location={isModal ? prevLocation : history.location}>
            <Route exact path="/" render={() => <MainPage />} />
            <Route exact path="/shows" render={() => <ShowsPage />} />
            <Route exact path="/shows/:genre" render={() => <ShowsPage />} />
            <Route exact path="/search/shows/:query" render={() => <ShowsResults />} />
            <Route exact path="/shows/show/:showId" render={() => <ShowPage />} />
            <Route exact path="/actors/:actorId" render={() => <ActorPage />} />
            <Route exact path="/profile/:uid" render={() => authorized ? <ProfilePage /> : <SignInPage />} />
            <Route exact path="/users/:uid" render={() => authorized ? <UserPage /> : <SignInPage />} />
            <Route exact path="/signup" render={() => !authorized ? <SignUpPage /> : <ProfilePage />} />
            <Route exact path="/signin" render={() => authorized ? <SignInPage /> : <ProfilePage />} />
            <Route exact path="/signout" render={() => authorized ? <SignOutPage /> : <SignInPage />} />
            <Route exact path="/updateProfile" render={() => authorized ? <UpdateProfile /> : <SignInPage />} />
            <Route exact path="/users" render={() => authorized ? <UsersPage /> : <SignInPage />} />
          </Switch>
          {isModal
            ? <>
              <Route exact path="/signup" render={() => <SignUpPage isModal />} />
              <Route exact path="/signin" render={() => <SignInPage isModal />} />
              <Route exact path="/signout" render={() => <SignOutPage isModal />} />
              <Route exact path="/updateProfile" render={() => <UpdateProfile isModal />} />
            </>
            : null
          }
        </>
      </div>
      }</>
  );
};

export default App;
