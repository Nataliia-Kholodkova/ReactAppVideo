import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import ShowsResults from '../appPages/SearchResults/ShowsResults/ShowsResults';
import ShowsPage from '../appPages/SowsPage/ShowsPage';
import ShowPage from '../appPages/ShowPage/ShowPage';
import ActorPage from '../appPages/ActorPage/ActorPage';
import MainPage from '../appPages/MainPage/MainPage';
import Profile from '../Profile/Profile';
import SignUpPage from '../appPages/SignUpPage/SignUpPage';
import SignInPage from '../appPages/SingInPage/SignInPage';
import SignOutPage from '../appPages/SignOutPage/SignOutPage';
import UpdateProfile from '../appPages/UpdateProfile/UpdateProfile';
import styles from './App.module.css';

const App = () => {
  const history = useHistory();
  const [prevLocation, setPrevLocation] = useState(history.location);
  const [isModal, setIsModal] = useState(false);
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
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/signup" render={() => <SignUpPage />} />
          <Route exact path="/signin" render={() => <SignInPage />} />
          <Route exact path="/signout" render={() => <SignOutPage />} />
          <Route exact path="/updateProfile" render={() => <UpdateProfile />} />
        </Switch>
        {isModal
          ? <>
            <Route exact path="/signup" render={() => <SignUpPage />} />
            <Route exact path="/signin" render={() => <SignInPage />} />
            <Route exact path="/signout" render={() => <SignOutPage />} />
            <Route exact path="/updateProfile" render={() => <UpdateProfile />} />
          </>
          : null
    }
      </>
    </div>
  );
};

export default App;
