import { useState } from "react";
import audio from "./assets/blood_sound.mp3";
import { Link } from "react-router-dom"
import welcome from "./assets/welcome2.png"

export function MoviesIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSubgenre, setSelectedSubgenre] = useState("");
  const [audioElement] = useState(new Audio(audio));

  const uniqueSubgenres = new Set(props.movies.map((movie) => movie.subgenre));

  const handleSubgenreChange = (subgenre) => {
    setSelectedSubgenre(subgenre);
    playAudio()
  };

  const filteredMovies = props.movies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
        (selectedSubgenre === "" || movie.subgenre === selectedSubgenre)
    );

  const playAudio = () => {
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  return (
    <div>
      <img src={welcome} className="welcomeimage" />
      <div className="dropdown-box">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="box-text">Subgenres</span>
        </a>

        <ul className="dropdown-menu">
          {[...uniqueSubgenres].map((subgenre) => (
            <li
              key={subgenre}
              onClick={() => handleSubgenreChange(subgenre)}
              className="dropdown-item"
            >
              {subgenre}
            </li>
          ))}
          <li onClick={() => handleSubgenreChange("")} className="dropdown-item">
            All
          </li>
        </ul>
      </div>

      <br></br>
      <br></br>
      <h4 className="search"> Search filter:</h4>
      <input
        type="text"
        value={searchFilter}
        onChange={(event) => setSearchFilter(event.target.value)}
        list="title"
      />

      <div className="container">
        <h1 className="indexheader">All Movies</h1>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movies">
              <br></br>
              <div className="card">
                <div className="card-body">
                  <img
                    src={movie.image_url}
                    width="100px"
                    height="150px"
                    alt={movie.title}
                  />
                  <br></br>
                  <br></br>
                  <h2>{movie.title}</h2>

                  <p>Description: {movie.description}</p>
                  <p>Subgenre: {movie.subgenre}</p>
                  <Link to={`/movies/${movie.id}`}>
                    <button className="showbutton">Go to show page</button>
                  </Link>
                  <br></br>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="card">
            <div className="card-body">
              <p>No movies match the selected criteria.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
