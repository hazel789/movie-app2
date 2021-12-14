import React, { useState } from 'react';
import {Route, Link} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Details from '../pages/Details';

const Display = (props) => {

    // let popular = (<div></div>)

    // if (props.searchInput === '') {

        
    // }


    let moviesDisplay=(<div></div>)

    if (!props.fetching && props.movieData.length !== 0) {

        console.log(props.movieData);

        moviesDisplay = props.movieData.results.map((movies, index) => {
            return (
                <div className="card">
                    <Link to={{
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
            <div>
                {/* {popular} */}
                {moviesDisplay}
            </div>
        )
}

export default Display;