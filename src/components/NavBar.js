import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import Display from './Display';
import Favourites from './Favourites';

import './navbar.css'

const NavBar = (props) => {

    const clearSearch = () => {
        props.setMovieData('');
    }

    const handleShowFavourites = () => {

         props.setShowFavourites(false);

        if (!props.showFavourites) {
            props.setShowFavourites(true)
        }
           
    }


    return (
        <header className="navbar">
            <nav>
                <ul>
                    <li>
                        <NavLink onClick={clearSearch} className={(navData) => (navData.isActive ? "active" : "")} to='/'>Home</NavLink>
                    </li>
                    <button id= "favouritesButton" onClick={handleShowFavourites}>To Watch</button>
                    <h4>freeTrailers.com</h4>

                </ul>

            </nav>
 
        </header>
    )
}

export default NavBar;