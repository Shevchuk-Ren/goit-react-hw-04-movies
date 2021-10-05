import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import {
  BrowserRouter,
  Route,
  NavLink,
  useParams,
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
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
  let queryParams = `https://api.themoviedb.org/3/search/movie?`;

  useEffect(() => {
    if (location.search === '') {
      window.localStorage.clear();
      setMovies([]);
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
  }, [query, queryParams, location.search, setMovies]);

  const handleSubmit = search => {
    setQuery(search);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit}></Searchbar>

      {movies.length !== 0 ? (
        <ul>
          {movies.map(({ name, original_title, id }) => (
            <li key={id}>
              <Link to={`/goit-react-hw-05-movies/movies/${id}`}>
                {name ? name : original_title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <li>Enter correct film's name</li>
      )}
    </div>
  );
}
