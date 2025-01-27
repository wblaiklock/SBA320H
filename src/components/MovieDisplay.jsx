import React from 'react'

function MovieDisplay({movie}) {
    
    const loaded = () => {
        return (
            <div id="item">
            <h1>{movie.Title}</h1>
            <h2>{movie.Genre}</h2>
            <img src={movie.Poster} alt={movie.Title} />

            <p>{movie.Plot}</p>
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">{`${movie.imdbRating} on IMDB`}</a>
            </div>)
    }

    const loading = () => {
        return (
            <>
            <h1>Find your Favorite Movies</h1>
            </>
        )
    }

    return (
        <div>
           {movie ? loaded() : loading()}
        </div>
        
    )
}

export default MovieDisplay