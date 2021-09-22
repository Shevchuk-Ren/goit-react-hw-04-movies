import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './AppBar.css'

export default function AppBar() {

    return (
        <header className='header'>
            <nav>
                <NavLink exact className='home-link' to='/' activeClassName='activelink'>Home</NavLink>
            <NavLink className='home-link' to='/movies' activeClassName='activelink'>Movies</NavLink> 
            </nav>
           
        </header>
    
);
}