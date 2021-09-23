import React, { useState, useEffect } from 'react';
import apiFetch from '../../services/fetch/fetch-api'
import {  Route, NavLink, useParams, Link } from 'react-router-dom';

export default function Cast(params) {
    const { movieId } = useParams();
    const [cast, setCast] = useState([])
console.log(movieId)
     let queryParams = `https://api.themoviedb.org/3/movie/${movieId}/credits?`;

  

    useEffect(() => {
         apiFetch.fetchApi(queryParams).then(actors => {
             console.log(actors.cast, `cast`)
            setCast(actors.cast)
      
             
        } 
         ).catch(error => {
             console.log(error)
             
         })

        // return () => {
        //     cleanup
        // }
    }, [queryParams])
    return (
        <div>
            <p>Additional Information</p>
            <ul>
                {cast && cast.map(({ name, profile_path, character }) => (
                    <li>
                        <img src={`https://image.tmdb.org/t/p/original${profile_path}`} alt={name} width="150" />
                        <h3>{name}</h3>
                        <p>Character: <span>{character}</span></p>
                    </li>
                ))}
            </ul>
        </div>
    )
}