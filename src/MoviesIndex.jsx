import { useState } from "react";

export function MoviesIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSubgenre, setSelectedSubgenre] = useState("");

  const uniqueSubgenres = new Set(props.movies.map((movie) => movie.subgenre));

  const handleSubgenreChange = (subgenre) => {
    setSelectedSubgenre(subgenre);
  };

  const filteredMovies = props.movies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
        (selectedSubgenre === "" || movie.subgenre === selectedSubgenre)
    );

  return (
    <div>
    
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
      <h4> Search filter:</h4>
      <input
        type="text"
        value={searchFilter}
        onChange={(event) => setSearchFilter(event.target.value)}
        list="title"
      />

      <div className="container">
        <h1>All Movies</h1>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movies">
              <br></br>
              <div className="card">
                <div className="card-body">
                  <h2>{movie.title}</h2>
                  <img
                    src={movie.image_url}
                    width="100px"
                    height="150px"
                    alt={movie.title}
                  />
                  <p>Description: {movie.description}</p>
                  <p>Subgenre: {movie.subgenre}</p>
                  <a href={`/movies/${movie.id}`}>
                    <button>Go to show page</button>
                  </a>
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
