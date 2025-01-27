
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
  const [movie, setMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState('');
  
  const fetchMovies = async (search = 'The godfather') => {
    if (search.length < 3) {
      return;
    }
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`).then(res => res.json());
    const { Error, Search: movies, totalResults: totalCount } = response;
    
    return { movies, totalCount, Error: Error ?? '' };
  }

  const selectMovie = async (movie) => {
    
    setSelectedMovie(movie);
    const newMovie = await fetchMovieById(movie.imdbID);
     if (newMovie.Error) {
       setErrorDetail(newMovie.Error);
        setSelectedMovie(null); 
     } else {
       setSelectedMovie(newMovie); 
     }
   
  };
  const fetchMovieById = async (movieId) => {
 
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`).then(res => res.json());
   
    return response;
  }
  const getMovie = async (searchTerm) => {
    try{
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`)
      const data = await response.json()

      setMovie(data);
    } catch (error) {
    console.error(error);
    }
  }

  const callApi = async (search = '') => {

    const data = await fetchMovies(search);
    console.log(data)

   
    if (!data.Error.length) {
      setMovies(data.movies);
      setSelectedMovie(data.movies[0])
      setTotalCount(data.totalCount);
    } else {
      setTotalCount(0);
      setMovies([]);
    }
  }


  return (
    <div className="App">
        <img src="/img/logo.png" className="logo"/>
        <Navbar onSearchChange = {callApi}/>
        {/* <Form movieSearch = {getMovie}/> */}
        <img src="/img/logo.png" className="logo-big"/>

        <MovieList onSelectMovie={selectMovie} movies={movies}/>
        <MovieDetail movie={selectedMovie }/>
         <MovieDisplay movie = {selectedMovie}/>

    </div>
  )
}

export default App
