import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { useParams } from 'react-router-dom';

export default function Cast(params) {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  let queryParams = `https://api.themoviedb.org/3/movie/${movieId}/credits?`;

  useEffect(() => {
    apiFetch
      .fetchApi(queryParams)
      .then(actors => {
        console.log(actors, `actors`);
        setCast(actors.cast);
      })
      .catch(error => {
        console.log(error);
      });

    // return () => {
    //     cleanup
    // }
  }, [queryParams]);
  return (
    <div className="cast-wrap">
      <p>Additional Information</p>
      <ul className="cast-list">
        {cast &&
          cast.map(({ name, profile_path, character, id }) => (
            <li className="cast-item" key={id}>
              <img
                src={`https://image.tmdb.org/t/p/original${profile_path}`}
                alt={name}
                width="150"
              />
              <h3>{name}</h3>
              <p>
                Character: <span>{character}</span>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
