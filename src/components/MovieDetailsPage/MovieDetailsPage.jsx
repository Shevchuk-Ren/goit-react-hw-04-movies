import React, { useEffect, useState, lazy, Suspense } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import noUser from '../../images/noUser.jpg';
import PropTypes from 'prop-types';
import {
  Route,
  useParams,
  NavLink,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import './MovieDetailsPag.css';

const Cast = lazy(() => import('../Cast/Cast' /*webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /*webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  let queryParams = `https://api.themoviedb.org/3/movie/${movieId}?`;

  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    apiFetch
      .fetchApi(queryParams)
      .then(movie => {
        console.log(movie.genres, `movie`);

        setMovie(movie);
      })
      .catch(error => {
        console.log(error);
      });
  }, [queryParams]);

  const handleGoBack = () => {
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
    // return movie.poster_path ?  `https://image.tmdb.org/t/p/original${movie.poster_path}` : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    } else if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    }

    return noUser;
  };

  return (
    <div className="wrap-page">
      <button type="button" className="page-btn" onClick={handleGoBack}>
        Go Back
      </button>
      <div className="card-page">
        <div>
          <img
            src={createPoster()}
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
            pathname: `/movies/${movieId}/cast`,
            state: { from: `${window.localStorage.getItem('url')}` },
          }}
          activeClassName="activelink"
        >
          Cast
        </NavLink>
        <NavLink
          className="link-page"
          key="2"
          to={{
            pathname: `/movies/${movieId}/reviews`,
            state: { from: `${window.localStorage.getItem('url')}` },
          }}
          activeClassName="activelink"
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Suspense
          fallback={
            <div>
              <h2>Loading...</h2>
            </div>
          }
        >
          <Route path="/movies/:movieId/cast">
            <Cast />
          </Route>
          <Route path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
        </Suspense>
      </div>
    </div>
  );
}

MovieDetailsPage.propTypes = {
  movieId: PropTypes.number,
};
