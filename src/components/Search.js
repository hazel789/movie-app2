import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.css'
import NavBar from './NavBar'

const Search = (props) => {

    const [keyword, setKeyword] = useState('')


    const handleOnClick = (event) => {
        event.preventDefault();

        props.setSearchInput(keyword)
        console.log("clicked")
        props.setFetching(true)
    }

    const handleOnChange = (event) => {
        setKeyword(event.target.value)
    }

    return (
        <header>
            <div className='header'>
                <h1 className="header-title">Welcome!</h1>
                <h2 className="header-title2">Explore millions of movies with us.</h2>

                    <form>
                    <input value={keyword} htmlFor="search" placeholder="Search for movies" className="searchBar" onChange={handleOnChange}></input>
                    <input type="submit" id='searchButton' onClick={handleOnClick}></input>
                    </form>
        
            </div>
                </header>
    )
}

export default Search;