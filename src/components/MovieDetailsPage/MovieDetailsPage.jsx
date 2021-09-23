import React, { useEffect, useState } from 'react';
import apiFetch from '../../services/fetch/fetch-api'
import { BrowserRouter, Route, NavLink, useParams, Link } from 'react-router-dom';

import './MovieDetailsPag.css'
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    let queryParams = `https://api.themoviedb.org/3/movie/${movieId}?`;

    const [movie, setMovie] = useState([])
    console.log(URL)

    useEffect(() => {
         apiFetch.fetchApi(queryParams).then(movie => {
             console.log(movie)
             setMovie(movie)
      
             
        } 
         ).catch(error => {
             console.log(error)
             
         })

        // return () => {
        //     cleanup
        // }
    }, [queryParams])
    const createName = () => {
        return movie.title ? movie.title : movie.original_title;
    }
    const createPoster = () => {
       return movie.poster_path? movie.poster_path : movie.backdrop_path
    }
    return (
        <div>
        <div className='wrap-page'>
          <div> <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={createName() ? createName() : "No info"} width='300' /></div>
           <div><h1>{createName() ? createName() : "No info"}<span>({ parseInt(movie.release_date)})</span></h1>
                <p>User scope: </p>
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                     <h2>Genres</h2>
                     <p>{movie.genres && movie.genres.map(({name}) => (<span>{name}</span>))}</p>
                </div>
             
            </div>
            <div className="wrap-dop">
                <Link to={`/movies/${movieId}/cast`}>
                 
                   Cast </Link>
                    <Link to={`/movies/${ movieId}/reviews`}>Reviews</Link>
            </div>
            <div>
                     <Route path='/movies/:movieId/cast'>
          <Cast></Cast>
                </Route>
                               <Route path='/movies/:movieId/reviews'>
          <Reviews></Reviews>
        </Route>
            </div>
        </div>
    )
}