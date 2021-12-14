import './App.css';
import React, { useState, useEffect } from 'react'
import {Route} from 'react-router-dom';

import Search from './components/Search';
import Display from './components/Display'
import Details from './pages/Details'


function App() {

  const [movieData, setMovieData] = useState('');
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState({});
  const [fetching, setFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('')



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

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=31a40805676bdd5d1f2295449e6165c1&language=en-US&page=1'
    
      fetchPopular(url);

  }, [])

  console.log(popularMovies);

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


    if (fetching && searchInput !== '') {
            fetchMovies(url);
      }
          
      },[fetching])
  
  
  return (
    <>
      <Route exact path='/'>

        <Search setSearchInput={setSearchInput} setFetching={setFetching}></Search>
        
        {/* {loading ?
          <p>Loading</p>
          : */}
          {/* // popularMovies.results.map((movies, index) => { */}

          {/* // return (
          //   <div className="popular">
          //     <div key={index}>{movies.original_title}</div>
          //     <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movies.poster_path}`} alt=''></img>
          //   </div>
          // )
        }) */}
        

        {/* {popularMovies.results[0] && popularMovies.results[0].original_title} */}
        <Display movieData={movieData} fetching={fetching} popularMovies={popularMovies} searchInput={searchInput}></Display>
      </Route>
      <Route exact path='/:movies'><Details/></Route>
    </>
  );
}

export default App;
