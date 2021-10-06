import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import Searchbar from '../SearchBar/SearchBar';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default function MoviesPage(params) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useLocalStorage('movies', []);
  const location = useLocation();
  const { url } = useRouteMatch();
  console.log(url);
  let queryParams = `https://api.themoviedb.org/3/search/movie?`;

  useEffect(() => {
    if (location.search === '') {
      window.localStorage.clear();
      setMovies([]);
      return;
    }
    if (!query) {
      console.log(`вы зашли в movies`);
      return;
    }

    apiFetch
      .fetchApi(queryParams, query)
      .then(movies => {
        setMovies(movies.results);
      })
      .catch(error => {
        console.log(error);
      });

    //  if (location.search) {
    //   console.log(`воть`)
    // }

    // return () => {
    //     cleanup
    // }
  }, [location.search, query, queryParams, setMovies]);

  const handleSubmit = search => {
    //  window.localStorage.setItem('search', search);
    window.localStorage.setItem('url', url + `?query=${search}`);
    setQuery(search);
    console.log(url, `url`);
  };

  return (
    <div className="movies-wrap">
      <Searchbar onSubmit={handleSubmit}></Searchbar>

      {movies.length !== 0 ? (
        <ul className="movies-list">
          {movies.map(({ name, original_title, id }) => (
            <li key={id}>
              <NavLink
                className="movies-item"
                to={`/goit-react-hw-05-movies/movies/${id}`}
              >
                {name ? name : original_title}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>Enter correct film's name</p>
      )}
    </div>
  );
}
