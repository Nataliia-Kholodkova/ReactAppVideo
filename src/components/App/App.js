import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header/Header';
import ShowsResults from '../appPages/SearchResults/ShowsResults/ShowsResults';
import ShowsPage from '../appPages/SowsPage/ShowsPage';
import ShowPage from '../appPages/ShowPage/ShowPage';
import ActorPage from '../appPages/ActorPage/ActorPage';
import MainPage from '../appPages/MainPage/MainPage';
import Profile from '../Profile/Profile';
import SignUpPage from '../appPages/SignUpPage copy/SignUpPage';
import SignInPage from '../appPages/SingInPage/SignInPage';
import SignOutPage from '../appPages/SignOutPage/SignOutPage';

const App = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.root}>
      <Header />
      <>
        <Switch>
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
        </Switch>
      </>
    </div>
  );
};

export default App;
