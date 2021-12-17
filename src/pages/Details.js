import React, {useEffect, useState} from 'react';
import { useLocation} from "react-router-dom";
import './details.css'
import ReactPlayer from 'react-player/lazy'


import Recommendations from '../components/Recommendations';

const Details = (props) => {

    const [movieDetails, setMovieDetails] = useState({})

    const [movieRecommendations, setMovieRecommendations] = useState({})
    const [videos, setVideos] = useState({})
  
    const location = useLocation();
    let movieId = location.pathname
    let movieID = movieId.replace('/', '')


    const fetchMovieDetails = async (url) => {

        try {
            const res = await fetch(url);

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

        if (!props.fetchingReco) {
            fetchMovieDetails(url);
        }
            
    }, [props.fetchingReco])


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

    useEffect(() => {

        const url = (`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US&page=1`)

        if (!props.fetchingReco) {
            fetchMovieRecommendations(url);
        }
            
        props.setFetchingReco(true);

    }, [props.fetchingReco])


    const fetchVideos = async (url) => {

        try {
            const res = await fetch(url);
            console.log(res)
            if (res.status !== 200) {
                throw new Error('Something went wrong.');
            }

            const videoData = await res.json();

            setVideos(() => {
                return {
                    key: videoData.results[0]?.key
                }
            })
        
        } catch (err) {
            console.log(err);
        }

        console.log('done loading');
    }
    useEffect(() => {

        const url = (`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US`)

        if (!props.fetchingReco) {
            fetchVideos(url);
        }

    }, [props.fetchingReco])

    const handleFavourite = () => {

        props.setFavourites((prevFavourites) => {

            if (prevFavourites?.length === 0) {
                return [
                ...prevFavourites, movieDetails
                ]
                
            } else {
                if (prevFavourites.find(movie => movie.id === movieDetails.id)) {

                    console.log(prevFavourites);

                    return prevFavourites;

                } else {

                    return [
                    ...prevFavourites, movieDetails
                    ]   
                }
                }
            }
        )
        
    }

return (
    <>
        
        <div id = "movieDetails" style={{
            backgroundImage: `url("https://www.themoviedb.org/t/p/original/${movieDetails.backdrop_path}")`
        }}>
            <ReactPlayer className="video" url={`https://youtube.com/watch?v=${videos.key}`} />
            <div className="description">
                <h2>{movieDetails.original_title}</h2>
                <h4><b>Release Date:</b> {movieDetails.release_date}<span /><b>|<span />Runtime: </b>{movieDetails.runtime} mins</h4>
                <div>
                    <h5><b>User Rating:</b></h5>
                    <button class='spin circle'>{movieDetails.vote_average}</button>
                    <span/><h5><b>Bookmark:</b></h5>
                    <button class="spin circle heart" onClick={handleFavourite}><i className="fa fa-heart" /></button>
                </div>
                <h4><b>Overview: </b><br />{movieDetails.overview}</h4>
                <div className="genres">
                    <h4 id="genre-word"><b>Genres:</b></h4>
                    {movieDetails.genres?.map((genre) => {
                        return <span className="genre-keyword">{genre.name}</span>;
                    })}
                </div>
            </div>
        </div>
        <Recommendations fetchingReco={props.fetchingReco} setFetchingReco={props.setFetchingReco} movieRecommendations={movieRecommendations}></Recommendations>
    </>
    )
}

export default Details