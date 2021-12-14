import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

const Details = () => {

    const [movieDetails, setMovieDetails] = useState({})
    const [fetchingReco, setFetchingReco] = useState(false);
    const [movieRecommendations, setMovieRecommendations] = useState({})
  
    const location = useLocation();
    let movieId = location.pathname
    let movieID = movieId.replace('/', '')
    
    console.log(movieID);


    const fetchMovieDetails = async (url) => {

        try {
            const res = await fetch(url);
            console.log(res)
            if (res.status !== 200) {
                throw new Error('Something went wrong.');
            }

            setMovieDetails(await res.json());
        
        } catch (err) {
            console.log(err);
        }


        console.log('done loading');
    }


    useEffect(() => {

        const url = (`https://api.themoviedb.org/3/movie/${movieID}?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US`)

        fetchMovieDetails(url);
            
    }, [])


    const fetchMovieRecommendations = async (url) => {

        try {
            const res = await fetch(url);
            console.log(res)
            if (res.status !== 200) {
                throw new Error('Something went wrong.');
            }

            setMovieRecommendations(await res.json());
            console.log(movieRecommendations)
        
        } catch (err) {
            console.log(err);
        }


        console.log('done loading');
    }

    let movieRecos = (<div></div>);

    useEffect(() => {

        const url = (`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US&page=1`)

        fetchMovieRecommendations(url);
            
        setFetchingReco(true);

    }, [])


    // if (fetchingReco) {
    //     console.log(movieRecommendations)
    //     movieRecos = movieRecommendations.results.map((movie) => {
    //         return (
    //             <>
    //                 <h5>{movie.original_title}</h5>
    //                 <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt=''></img>
    //             </>
    //         )
    //     })
    // }


return (
    <div>
        <h1>{movieDetails.original_title}</h1>
        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movieDetails.poster_path}`} alt=''></img>
        <div className="description">
            <h4>Release Date: {movieDetails.release_date}</h4>
            <h5>Overview: <br/> {movieDetails.overview}</h5>
        </div>
        <div className="recommendations">
            <h2>Recommendations:</h2>
            {movieRecos}
        </div>
    </div>
    )
}

export default Details