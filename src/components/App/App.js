import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header/Header';
import ShowsResults from '../appPages/SearchResults/ShowsResults/ShowsResults';
import ShowsPage from '../appPages/SowsPage/ShowsPage';
import Aside from '../Aside/Aside';

function App () {
  return (
    <div className={styles.root}>
      <Header />
      <Aside />
      <main className={styles.main}>
        <Switch>
          <Route exact path="/" render={() => <ShowsPage />} />
          <Route exact path="/search/shows/:query" render={() => <ShowsResults />} />
          <Route exact path="/search/actors/:query" render={() => <h1>SEARCH Actors</h1>} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
