import { BrowserRouter, Route } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';

import HomePage from '../HomePage';
import MoviesPage from '../MoviesPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/movies">
        <MoviesPage />
      </Route>
    </div>
  );
}

export default App;
