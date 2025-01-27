
import './App.css'
import React, { useState , useEffect} from 'react'
import MovieDisplay from './components/MovieDisplay'
import Form from './components/Form'

function App() {

  const apiKey = '7d9932fb'

  const [movie, setMovie] = useState(null);

  const getMovie = async (searchTerm) => {
    try{
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`)
      const data = await response.json()

      setMovie(data);
    } catch (error) {
    console.error(error);
    }
  }

  useEffect(()=>{    //runs once
    getMovie("Gladiator")
  }, [])

  return (
    <div className="App">
        <img src="/img/logo.png" className="logo"/>
        <Form movieSearch = {getMovie}/>
        <MovieDisplay movie = {movie}/>
  
    </div>
  )
}

export default App
