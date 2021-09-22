import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import HomeView from '../HomeView/HomeView';
import MoviesView from '../MoviesView/MoviesView';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage></HomePage>
      <Route exact path="/">
        <HomeView></HomeView>
      </Route>
      <Route exact path="/movies">
        <MoviesView></MoviesView>
      </Route>
    </div>
  );
}

export default App;
