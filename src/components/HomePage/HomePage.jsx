import { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { NavLink, useRouteMatch, useLocation } from 'react-router-dom';

export default function HomePage(params) {
  const URL = 'https://api.themoviedb.org/3/trending/movie/week?';
  const [gallery, setGallery] = useState('');
  const { url } = useRouteMatch();
  const location = useLocation();
  useEffect(() => {
    apiFetch.fetchApi(URL).then(movies => {
      console.log(movies.results);
      setGallery(movies.results);
      window.localStorage.setItem('url', url);
    });

    return () => {};
  }, [url]);

  return (
    <div className="home-wrap">
      <h1>Trending today</h1>

      {gallery && (
        <ul>
          {gallery.map(
            ({ name, original_title, id }) => (
              <li key={id}>
                <NavLink
                  className="home-item"
                  // to={`/goit-react-hw-05-movies/movies/${id}`}
                  to={{
                    pathname: `/movies/${id}`,
                    state: { from: location },
                  }}
                >
                  {name ? name : original_title}
                </NavLink>
              </li>
            ),
            // <NavLink>{movie.name}</NavLink>
          )}
        </ul>
      )}
    </div>
  );
}
