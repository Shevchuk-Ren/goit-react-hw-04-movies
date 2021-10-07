import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
// import HomePage from '../HomePage';
// import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
// import MoviesPage from '../MoviesPage';
// import NotFoundView from '../NotFoundView/NotFoundView';
import './App.css';

const HomePage = lazy(() =>
  import('../HomePage' /*webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../MovieDetailsPage/MovieDetailsPage.jsx' /*webpackChunkName: "movie-detail-page" */
  ),
);
const MoviesPage = lazy(() =>
  import('../MoviesPage' /*webpackChunkName: "movie-page" */),
);
const NotFoundView = lazy(() =>
  import('../NotFoundView/NotFoundView' /*webpackChunkName: "not-found" */),
);

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
      <Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Switch>
          <Route exact path="/goit-react-hw-05-movies">
            <HomePage />
          </Route>

          <Route path="/goit-react-hw-05-movies/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/goit-react-hw-05-movies/movies">
            <MoviesPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
