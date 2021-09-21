import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header/Header';
import ShowsResults from '../appPages/SearchResults/ShowsResults/ShowsResults';
import ShowsPage from '../appPages/SowsPage/ShowsPage';
import ShowPage from '../appPages/ShowPage/ShowPage';
import ActorPage from '../appPages/ActorPage/ActorPage';
import MainPage from '../appPages/MainPage/MainPage';

const App = () => (
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
        </Switch>
      </>
  </div>
);

export default App;
