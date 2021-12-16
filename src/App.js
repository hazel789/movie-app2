import './App.css';
import React, { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import Favourites from './components/Favourites';

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
 

import Search from './components/Search';
import Display from './components/Display'
import Details from './pages/Details'


function App() {

  const [movieData, setMovieData] = useState('');
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState({});
  const [topRated, setTopRated] = useState({});
  const [fetching, setFetching] = useState(false);

  const [fetchingReco, setFetchingReco] = useState(false);
  const [searchInput, setSearchInput] = useState('')
  const [favourites, setFavourites] = useState([])
  const [showFavourites, setShowFavourites] = useState(false);


  const fetchPopular = async (url) => {
    
    setLoading(true)

    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error('something went wrong');
      }

      const popular = await res.json();
      setPopularMovies(popular);

      setLoading(false);

    } catch (err) {
        console.log(err);
    }

  }

   const fetchTopRated = async (url) => {
    
    setLoading(true)

    try {
      const res = await fetch(url);
      if (res.status !== 200) {
        throw new Error('something went wrong');
      }

      setTopRated(await res.json());

      setLoading(false);

    } catch (err) {
        console.log(err);
    }

  }

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US&page=1'
    
      fetchPopular(url);

  }, [])


  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US&page=1'
    
      fetchTopRated(url);

  }, [])


  const fetchMovies = async (url) => {
   
    try {
      const res = await fetch(url);
      console.log(res)
      if (res.status !== 200) {
        throw new Error('Something went wrong.');
      }

      setMovieData(await res.json());    
    } catch (err) {
        console.log(err);
    }
    
    setFetching(false);

    console.log('done loading');   
    }

  
  useEffect(() => {

    const url = (`https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=false&page=1&api_key=31a40805676bdd5d1f2295449e6165c1&query=${searchInput}`)


     if (searchInput.length === 0) {
      setFetching(false);
    }

    if (fetching) {
            fetchMovies(url);
    }
    
   
          
      },[fetching])

  
  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 3,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  }

  const handleReco = () => {
        setFetchingReco(false);
  }

  
  return (
    <>
      <NavBar setFavourites={setFavourites} setShowFavourites={setShowFavourites} showFavourites={showFavourites} setMovieData={setMovieData} setSearchInput={setSearchInput}/>
      <Favourites favourites={favourites} setShowFavourites={setShowFavourites} showFavourites={showFavourites} fetchingReco={fetchingReco} setFetchingReco={setFetchingReco}/>
      
      <Route exact path='/'>

        <Search setSearchInput={setSearchInput} setFetching={setFetching} ></Search>
        <Display movieData={movieData} fetching={fetching} popularMovies={popularMovies} searchInput={searchInput} fetchingReco={fetchingReco} setFetchingReco={setFetchingReco}></Display>
      
        <h2 className="big-titles1">Popular Movies</h2>
          
        <Slider {...sliderSettings}>
          {!loading && popularMovies.results?.map((movies, index) => {
            return (
              <div className = "slider">
                <div className="popular ">
                  <Link onClick={handleReco} className="link" to={{
                        pathname: `/${movies.id}`,
                        }}>
              <div key={index} className="titles">{movies.original_title}</div>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.poster_path}`} alt=''></img>
                </Link>
              </div>
            </div>
            )
        })}
        </Slider>

        <h2 className="big-titles2">Top Rated Movies</h2>
          
        <Slider {...sliderSettings}>
          {!loading && topRated.results?.map((movies, index) => {
            return (
              <div className = "slider">
                <div className="popular ">
              <Link onClick={handleReco} className="link" to={{
                        pathname: `/${movies.id}`,
                        }}>
              <div key={index} className="titles">{movies.original_title}</div>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.poster_path}`} alt=''></img>
              </Link>
              </div>
            </div>
            )
        })}
        </Slider>
        

      </Route>

      <Route exact path='/:movies'><Details setFavourites={setFavourites} favourites={favourites} fetchingReco={fetchingReco} setFetchingReco={setFetchingReco}/></Route>
    </>
  );
}

export default App;
