import React from 'react'

function MovieDisplay({movie}) {
    
    const loaded = () => {
        return (
            <>
            <h1>{movie.Title}</h1>
            <h2>{movie.Genre}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Year}</h3>
            </>
        )
    }

    const loading = () => {
        return (
            <>
            <h1>No movie to display</h1>
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