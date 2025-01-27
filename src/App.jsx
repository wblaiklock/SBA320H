
import './App.css'
import React, { useState , useEffect} from 'react'
import MovieDisplay from './components/MovieDisplay'

import { Navbar } from './components/Navbar';
import MovieList from './components/MovieList';

function App() {

  const apiKey = '7d9932fb'
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (search = 'The godfather') => {
    if (search.length < 3) {
      return;
    }
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`).then(res => res.json());
    const { Error, Search: movies, totalResults: totalCount } = response;
    
    return { movies, totalCount, Error: Error ?? '' };
  }

  const selectMovie = async (m) => {
    const newMovie = await fetchMovieById(m.imdbID);

    setSelectedMovie(m);
     if (newMovie.Error) {
        setSelectedMovie(null); 
     } else {
       setSelectedMovie(newMovie); 
     }

     setTimeout(function (){
  
      var scrollDiv = document.getElementById("item").offsetTop;
      window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
               
    }, 500);
  };

  const fetchMovieById = async (movieId) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`).then(res => res.json());
   
    return response;
  }


  const fetchMoviesByName = async (search = '') => {
    const data = await fetchMovies(search);

    var scrollDiv = document.getElementById("top").offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: 'smooth'});

    setSelectedMovie(null); 
   
    if (!data.Error.length) {
      setMovies(data.movies);
    } else {
      setMovies([]);
    }
  }


  return (
    <div className="App" id="top">
        <img src="/img/logo.png" className="logo"/>

        <Navbar onSearchChange = {fetchMoviesByName}/>

        {movies.length > 0 ?  <></> : <img src="/img/logo.png" className="logo-big"/>}

        <MovieList onSelectMovie={selectMovie} movies={movies}/>

        {  selectedMovie ? <MovieDisplay movie = {selectedMovie}/> : <></>}
    
    </div>
  )
}

export default App
