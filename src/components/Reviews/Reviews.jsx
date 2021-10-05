import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { Route, NavLink, useParams, Link } from 'react-router-dom';

export default function Reviews(params) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  let queryParams = `https://api.themoviedb.org/3/movie/${movieId}/reviews?`;

  useEffect(() => {
    apiFetch
      .fetchApi(queryParams)
      .then(reviews => {
        setReviews(reviews.results);
      })
      .catch(error => {
        console.log(error);
      });

    // return () => {
    //     cleanup
    // }
  }, [queryParams]);
  return (
    <div>
      <ul>
        {reviews &&
          reviews.map(({ author, content, id }) => (
            <li rey={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
      </ul>
      {reviews.length === 0 && <p>We don't have ane reviews for this movie.</p>}
    </div>
  );
}
