import React, { useEffect, useState } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { Route, useParams, Link, useHistory } from 'react-router-dom';

import './MovieDetailsPag.css';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  let queryParams = `https://api.themoviedb.org/3/movie/${movieId}?`;

  const [movie, setMovie] = useState([]);
  const history = useHistory();
  console.log(movieId, `quy`);

  useEffect(() => {
    apiFetch
      .fetchApi(queryParams)
      .then(movie => {
        setMovie(movie);
      })
      .catch(error => {
        console.log(error);
      });

    // return () => {
    //     cleanup
    // }
  }, [queryParams]);
  const createName = () => {
    return movie.title ? movie.title : movie.original_title;
  };
  const createPoster = () => {
    return movie.poster_path ? movie.poster_path : movie.backdrop_path;
  };
  return (
    <div key={movieId}>
      <div className="wrap-page" key={movieId}>
        <div>
          <button
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
          <img
            src={`https://image.tmdb.org/t/p/original${createPoster()}`}
            alt={createName() ? createName() : 'No info'}
            width="300"
          />
        </div>
        <div>
          <h1>
            {createName() ? createName() : 'No info'}
            <span>({parseInt(movie.release_date)})</span>
          </h1>
          <p>User scope: </p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>
            {movie.genres &&
              movie.genres.map(({ name }) => <span>{name}</span>)}
          </p>
        </div>
      </div>
      <div className="wrap-dop">
        <Link key="1" to={`/goit-react-hw-05-movies/movies/${movieId}/cast`}>
          Cast{' '}
        </Link>
        <Link key="2" to={`/goit-react-hw-05-movies/movies/${movieId}/reviews`}>
          Reviews
        </Link>
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
