import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { firebaseAuth } from '../../firebaseConf/firebaseConf';
import Header from '../Header/Header';
import ShowsResults from '../appPages/SearchResults/ShowsResults/ShowsResults';
import ShowsPage from '../appPages/SowsPage/ShowsPage';
import ShowPage from '../appPages/ShowPage/ShowPage';
import MainPage from '../appPages/MainPage/MainPage';
import UsersPage from '../appPages/UsersPage/UsersPage';
import Preloader from '../UI/Preloader/Preloader';
import styles from './App.module.css';

const ActorPage = lazy(() => import('../appPages/ActorPage/ActorPage'));
const SignUpPage = lazy(() => import('../appPages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../appPages/SingInPage/SignInPage'));
const SignOutPage = lazy(() => import('../appPages/SignOutPage/SignOutPage'));
const UpdateProfile = lazy(() => import('../appPages/UpdateProfile/UpdateProfile'));
const UserPage = lazy(() => import('../appPages/UserPage/UserPage'));
const ProfilePage = lazy(() => import('../appPages/ProfilePage/ProfilePage'));

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
          <Route exact path="/actors/:actorId" render={() => (
            <Suspense fallback={<Preloader className="preloader" />}>
              <ActorPage />
            </Suspense>
          )} />
          <Route exact path="/profile/:uid" render={() => (
            authorized
              ? <Suspense fallback={<Preloader className="preloader" />}>
                  <ProfilePage />
                </Suspense>
              : <Suspense fallback={<Preloader className="preloader" />}>
                <SignInPage />
              </Suspense>
          )} />
          <Route exact path="/users/:uid" render={() => (
            authorized
              ? <Suspense fallback={<Preloader className="preloader" />}>
                <UserPage />
              </Suspense>
              : <Suspense fallback={<Preloader className="preloader" />}>
                <SignInPage />
              </Suspense>
          )} />
            <Route exact path="/signup" render={() => (
              !authorized
                ? <Suspense fallback={<Preloader className="preloader" />}>
                  <SignUpPage />
                </Suspense>
                : <Suspense fallback={<Preloader className="preloader" />}>
                  <ProfilePage />
                </Suspense>
            )} />
            <Route exact path="/signin" render={() => (
              authorized
                ? <Suspense fallback={<Preloader className="preloader" />}>
                <SignInPage />
                </Suspense>
                : <Suspense fallback={<Preloader className="preloader" />}>
              <ProfilePage /></Suspense>)} />
            <Route exact path="/signout" render={() => (
              authorized
                ? <Suspense fallback={<Preloader className="preloader" />}>
              <SignOutPage /> </Suspense>
                : <Suspense fallback={<Preloader className="preloader" />}>
              <SignInPage /></Suspense>)} />
            <Route exact path="/updateProfile" render={() => (
              authorized
                ? <Suspense fallback={<Preloader className="preloader" />}>
              <UpdateProfile /> </Suspense>
                : <Suspense fallback={<Preloader className="preloader" />}>
              <SignInPage /></Suspense>)} />
            <Route exact path="/users" render={() => authorized
              ? <UsersPage />
              : <Suspense fallback={<Preloader className="preloader" />}>
            <SignInPage /></Suspense>} />
          </Switch>
          {isModal
            ? <>
              <Route exact path="/signup" render={() => <Suspense fallback={<Preloader className="preloader" />}><SignUpPage isModal /></Suspense>} />
              <Route exact path="/signin" render={() => <Suspense fallback={<Preloader className="preloader" />}><SignInPage isModal /></Suspense>} />
              <Route exact path="/signout" render={() => <Suspense fallback={<Preloader className="preloader" />}><SignOutPage isModal /></Suspense>} />
              <Route exact path="/updateProfile" render={() => <Suspense fallback={<Preloader className="preloader" />}><UpdateProfile isModal /></Suspense>} />
            </>
            : null
          }
        </>
      </div>
      }</>
  );
};

export default App;
