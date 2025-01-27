
import './App.css'
import React, { useState , useEffect} from 'react'
import MovieDisplay from './components/MovieDisplay'
import Form from './components/Form'

import { Navbar } from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';


function App() {

  const apiKey = '7d9932fb'
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [error, setError] = useState('');
  
  const fetchMovies = async (search = 'The godfather') => {
    if (search.length < 3) {
      return;
    }
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`).then(res => res.json());
    const { Error, Search: movies, totalResults: totalCount } = response;
    
    return { movies, totalCount, Error: Error ?? '' };
  }

  const selectMovie = async (m) => {
    
    setSelectedMovie(m);
    const newMovie = await fetchMovieById(m.imdbID);
     if (newMovie.Error) {
        setSelectedMovie(null); 
     } else {
       setSelectedMovie(newMovie); 
     }

     var scrollDiv = document.getElementById("item").offsetTop;
     window.scrollTo({ top: scrollDiv, behavior: 'smooth'});
  };
  const fetchMovieById = async (movieId) => {
 
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`).then(res => res.json());
   
    return response;
  }


  const callApi = async (search = '') => {

    const data = await fetchMovies(search);

    setSelectedMovie(null); 
   
    if (!data.Error.length) {
      setMovies(data.movies);
     

    } else {

      setMovies([]);
    }
  }


  return (
    <div className="App">
        <img src="/img/logo.png" className="logo"/>
        <Navbar onSearchChange = {callApi}/>
        {/* <Form movieSearch = {getMovie}/> */}
        {movies.length > 0 ?  <></> : <img src="/img/logo.png" className="logo-big"/>}

        <MovieList onSelectMovie={selectMovie} movies={movies}/>
        {/* <MovieDetail movie={selectedMovie }/> */}
       {  selectedMovie ? <MovieDisplay movie = {selectedMovie}/> : <></>}

    </div>
  )
}

export default App
