import React, { useState } from 'react';
import axios from 'axios';

export function MoviesList() {
  const [playingMovies, setPlayingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const genreId = 27;
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_SOME_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31`
      );
      console.log(response.data.results)
      setPlayingMovies(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching horror movie data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="fetchtitle">Now Playing Horror Movies</h2>
      <button onClick={fetchMovies} disabled={isLoading} className="fetchbutton">
        {isLoading ? 'Loading...' : 'Show Horror Movies'}
      </button>
      <br></br>
      <br></br>
      <ul>
        {playingMovies.map((movie) => (
          <div key={movie.id} >
            <div className="card">
              <div className="card-body">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title} width="100px" height="150px" />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>

              </div>
            </div>
            <br></br>
          </div>
        ))}
      </ul>
    </div>
  );
}
