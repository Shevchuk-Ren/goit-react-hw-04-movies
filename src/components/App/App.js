import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from '../AppBar';
import { Container } from './App.styled';

const HomePage = lazy(() =>
  import('../HomePage' /*webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../MovieDetailsPage/MovieDetailsPage' /*webpackChunkName: "movie-detail-page" */
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
    <Container>
      <AppBar></AppBar>
      <Suspense
        fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
