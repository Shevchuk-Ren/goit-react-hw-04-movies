import React, { useEffect, useState, lazy, Suspense } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import noUser from '../../images/noUser.jpg';
import PropTypes from 'prop-types';
import {
  Route,
  useParams,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import {
  BackBtn,
  Wrapper,
  Card,
  CardList,
  Item,
  Span,
  Description,
} from './MovieDetailsPage.styled';

const Cast = lazy(() => import('../Cast' /*webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('../Reviews' /*webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  let queryParams = `https://api.themoviedb.org/3/movie/${movieId}?`;

  const [movie, setMovie] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    apiFetch
      .fetchApi(queryParams)
      .then(movie => {
        setMovie(movie);
      })
      .catch(error => {
        console.log(error);
      });
  }, [queryParams]);

  const handleGoBack = () => {
    if (!location.state) {
      history.push('/');
      return;
    }

    history.push(location.state.from);
  };

  const createName = () => {
    return movie.title ? movie.title : movie.original_title;
  };
  const createPoster = () => {
    if (movie.poster_path) {
      return `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    } else if (movie.backdrop_path) {
      return `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    }

    return noUser;
  };

  return (
    <Wrapper>
      <BackBtn type="button" onClick={handleGoBack}>
        Go Back
      </BackBtn>
      <Card>
        <div>
          <img
            src={createPoster()}
            alt={createName() ? createName() : 'No info'}
            width="300"
          />
        </div>
        <Description>
          <h1>
            {createName() ? createName() : 'No info'}
            <span>({parseInt(movie.release_date)})</span>
          </h1>
          <p className="scope-page">
            User scope: <Span>{movie.vote_average * 10}% </Span>
          </p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p className="genres-page">
            {movie.genres &&
              movie.genres.map(({ name, id }) => <Span key={id}>{name}</Span>)}
          </p>
        </Description>
      </Card>
      <CardList>
        <Item
          to={{
            pathname: `/movies/${movieId}/cast`,
            state: { from: `${window.localStorage.getItem('url')}` },
          }}
          activeClassName="activelink"
        >
          Cast
        </Item>
        <Item
          to={{
            pathname: `/movies/${movieId}/reviews`,
            state: { from: `${window.localStorage.getItem('url')}` },
          }}
          activeClassName="activelink"
        >
          Reviews
        </Item>
      </CardList>
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
    </Wrapper>
  );
}

MovieDetailsPage.propTypes = {
  movieId: PropTypes.number,
};
