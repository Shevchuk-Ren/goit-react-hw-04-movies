import React, { useEffect, useState } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import {
  Route,
  useParams,
  NavLink,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import './MovieDetailsPag.css';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  let queryParams = `https://api.themoviedb.org/3/movie/${movieId}?`;

  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  console.log(movieId, `quy`);

  useEffect(() => {
    apiFetch
      .fetchApi(queryParams)
      .then(movie => {
        console.log(movie, `movie`);
        setMovie(movie);
      })
      .catch(error => {
        console.log(error);
      });

    // return () => {
    //     cleanup
    // }
  }, [queryParams]);

  const handleGoBack = () => {
    console.log(url, 'url');
    console.log(history, `HISTORY`);
    console.log(location.pathname);
    if (location.pathname === url) {
      history.goBack();
      return;
    }

    history.push(location.state.from);
  };
  const createName = () => {
    return movie.title ? movie.title : movie.original_title;
  };
  const createPoster = () => {
    return movie.poster_path ? movie.poster_path : movie.backdrop_path;
  };
  return (
    <div className="wrap-page">
      <button className="page-btn" onClick={handleGoBack}>
        Go Back
      </button>
      <div className="card-page">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/original${createPoster()}`}
            alt={createName() ? createName() : 'No info'}
            width="300"
          />
        </div>
        <div className="description-page">
          <h1>
            {createName() ? createName() : 'No info'}
            <span>({parseInt(movie.release_date)})</span>
          </h1>
          <p className="scope-page">
            User scope: <span>{movie.vote_average * 10}% </span>
          </p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p className="genres-page">
            {movie.genres &&
              movie.genres.map(({ name, id }) => <span key={id}>{name}</span>)}
          </p>
        </div>
      </div>
      <div className="wrap-dop">
        <NavLink
          className="link-page"
          key="1"
          to={{
            pathname: `/goit-react-hw-05-movies/movies/${movieId}/cast`,
            state: { from: `${window.localStorage.getItem('url')}` },
          }}
          activeClassName="activelink"
        >
          Cast{' '}
        </NavLink>
        <NavLink
          className="link-page"
          key="2"
          to={{
            pathname: `/goit-react-hw-05-movies/movies/${movieId}/reviews`,
            state: { from: `${window.localStorage.getItem('url')}` },
          }}
          activeClassName="activelink"
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Route path="/goit-react-hw-05-movies/movies/:movieId/cast">
          <Cast />
        </Route>
        <Route path="/goit-react-hw-05-movies/movies/:movieId/reviews">
          <Reviews />
        </Route>
      </div>
    </div>
  );
}
