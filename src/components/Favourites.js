import React from 'react';
import { Link } from 'react-router-dom';

import './favourites.css'

const Favourites = (props) => {
    
    const handleReco = () => {
        props.setFetchingReco(false)
    }

    const favouritesList = [];


    for (const element of props.favourites) {

        favouritesList.push(
            <li>
                <Link className="favouriteItem" onClick={handleReco} to={{
                    pathname: `/${element.id}`,
                }}>
                    <img className="thumbnail" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${element.poster_path}`} alt=''></img>
                    <span className="favourites_title"> {element.original_title}</span>
                </Link>
            </li>
        )
    }

       
    return (
        <div className="favourites-list" style={props.showFavourites && {display: 'none'} && favouritesList.length!==0 ? { display: "flex" } : { display: "none" }}>
            <ul>
                {favouritesList}
            </ul>
        </div>
    )


}

export default Favourites;