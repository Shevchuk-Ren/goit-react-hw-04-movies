import { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api'
import { BrowserRouter, Route, NavLink, Link } from 'react-router-dom';

export default function HomePage(params) {

    const [gallery, setGallery] = useState('')
    useEffect(() => {
        apiFetch.fetchApi().then(movies => {
            console.log(movies.results)
            setGallery(movies.results)
        } 
        )

        
        return () => {
           console.log(gallery)
        }
    }, [])
    return (
        <div>
            <h1>Hello World</h1>

            {gallery && gallery.map(({ name, original_title, id }) => (
                <li key={id}>
                    <Link to={ `/movies/${id}`}>{name ? name : original_title}</Link>
                    </li>
            )
                // <NavLink>{movie.name}</NavLink>
            )}

        </div>
    )
}