import { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { Item, Wrapper } from './HomePage.styled';

export default function HomePage(params) {
  const URL = 'https://api.themoviedb.org/3/trending/movie/week?';
  const [gallery, setGallery] = useState('');
  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    apiFetch.fetchApi(URL).then(movies => {
      setGallery(movies.results);
      window.localStorage.setItem('url', url);
    });

    return () => {};
  }, [url]);

  return (
    <Wrapper>
      <h1>Trending today</h1>

      {gallery && (
        <ul>
          {gallery.map(({ name, original_title, id }) => (
            <li key={id}>
              <Item
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
                {name ? name : original_title}
              </Item>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
}
