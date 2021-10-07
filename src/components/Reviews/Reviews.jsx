import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Item, Profile, Wrapper, Avatar } from './Reviews.styled';

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
    <Wrapper>
      <ul className="reviews-list">
        {reviews &&
          reviews.map(({ author, content, id, author_details }) => (
            <Item key={id}>
              <Profile>
                <h3>{author}</h3>
                <Avatar
                  className="reviews-img"
                  key={author_details.id}
                  src={createAvatar(author_details.avatar_path)}
                  alt=""
                  width="100"
                />
              </Profile>

              <p className="reviews-description">{content}</p>
            </Item>
          ))}
      </ul>
      {reviews.length === 0 && <p>We don't have ane reviews for this movie.</p>}
    </Wrapper>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.number,
};
