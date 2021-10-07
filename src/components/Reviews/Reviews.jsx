import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { useParams } from 'react-router-dom';

export default function Reviews(params) {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  // const [status, setStatus] = useState('idle');
  // const history = useHistory();

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
  }, [queryParams]);

  const createAvatar = avatar => {
    if (avatar) {
      return avatar.startsWith('/https')
        ? avatar.slice(1)
        : `https://image.tmdb.org/t/p/original${avatar}`;
    }
    //  return avatar.startsWith('https') ? avatar :`https://image.tmdb.org/t/p/original${avatar}`;
  };

  return (
    <div className="reviews-wrap">
      <ul className="reviews-list">
        {reviews &&
          reviews.map(({ author, content, id, author_details }) => (
            <li className="reviews-item" key={id}>
              <div className="reviews-profile">
                <h3>{author}</h3>
                <img
                  className="reviews-img"
                  key={author_details.id}
                  src={createAvatar(author_details.avatar_path)}
                  alt=""
                  width="100"
                />
              </div>

              <p className="reviews-description">{content}</p>
            </li>
          ))}
      </ul>
      {reviews.length === 0 && <p>We don't have ane reviews for this movie.</p>}
    </div>
  );
}
