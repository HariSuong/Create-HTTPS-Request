import React, { useCallback, useEffect, useState } from 'react'

import MoviesList from './components/MoviesList'
import './App.css'
import AddMovie from './components/AddMovie'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const respone = await fetch('https://swapi.dev/api/films')
      if (!respone.ok) {
        throw new Error('Something went wrong!')
      }

      const data = await respone.json()

      const transformMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        }
      })

      setMovies(transformMovies)
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  function addMovieHandler(movie) {
    console.log(movie)
  }

  let content = 'Found no movies'
  if (!error && !isLoading && movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = 'Loading...'
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
