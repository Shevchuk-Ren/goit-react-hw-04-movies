import { Switch, Route } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import HomePage from '../HomePage';
import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';
import MoviesPage from '../MoviesPage';
import NotFoundView from '../NotFoundView/NotFoundView';

import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
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
    </div>
  );
}

export default App;
