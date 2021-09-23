import { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api'
import { BrowserRouter, Route, NavLink, Link, useRouteMatch} from 'react-router-dom';

export default function HomePage(params) {
     const URL = 'https://api.themoviedb.org/3/trending/movie/week?';
    const [gallery, setGallery] = useState('')
    useEffect(() => {
        apiFetch.fetchApi(URL).then(movies => {
        
            setGallery(movies.results)
        } 
        )

        
        return () => {
          
        }
    }, [])
    return (
        <div>
            <h1>Hello World</h1>

            {gallery && gallery.map(({ name, original_title, id }) => (
                <li key={id}>
                    <Link to={`/movies/${id}`}>{name ? name : original_title}</Link>
                    
                    </li>
            )
                // <NavLink>{movie.name}</NavLink>
            )}

        </div>
    )
}