import React, { useState } from 'react';
import {Link} from 'react-router-dom';

import './display.css'

const Display = (props) => {

    const handleReco = () => {
        props.setFetchingReco(false);
    }

    let moviesDisplay = (<div></div>)
    let searchTitle = ''

    if (!props.fetching && props.movieData.length !== 0) {

        searchTitle = <h4 id="search-title">Search Results</h4>
        
        moviesDisplay = props.movieData.results.map((movies, index) => {
            return (
                <div className="card">
                    <Link onClick={handleReco} className="link" to={{
                        pathname: `/${movies.id}`,
                        }}>
                        <div key={index} id={movies.id}>{movies.original_title}</div>
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.poster_path}`} alt=''></img>
                    </Link>
                </div>
            )
        })

    }

    return (
            
        <div className="container">
            {searchTitle}
            <div className="container2">
            {moviesDisplay}
        </div>
            </div>
        )
}

export default Display;