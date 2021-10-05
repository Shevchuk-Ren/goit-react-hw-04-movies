import { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { Link } from 'react-router-dom';

export default function HomePage(params) {
  const URL = 'https://api.themoviedb.org/3/trending/movie/week?';
  const [gallery, setGallery] = useState('');
  useEffect(() => {
    apiFetch.fetchApi(URL).then(movies => {
      setGallery(movies.results);
    });

    return () => {};
  }, []);
  return (
    <div>
      <h1>Hello World</h1>

      {gallery && (
        <ul>
          {gallery.map(
            ({ name, original_title, id }) => (
              <li key={id}>
                <Link to={`/goit-react-hw-05-movies/movies/${id}`}>
                  {name ? name : original_title}
                </Link>
              </li>
            ),
            // <NavLink>{movie.name}</NavLink>
          )}
        </ul>
      )}
    </div>
  );
}
