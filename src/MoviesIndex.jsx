import { useState } from "react";

export function MoviesIndex(props) {
const [searchFilter, setSearchFilter] = useState("")

const [selectedSubgenre, setSelectedSubgenre] = useState("");

  const handleSubgenreChange = (subgenre) => {
    setSelectedSubgenre(subgenre);
  };

  const filteredMovies = props.movies
    .filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
        (selectedSubgenre === "" || movie.subgenre === selectedSubgenre)
    )
    .map((movie) => (
      <div key={movie.id} className="movies">
        <br></br>
        <div className="card">
          <div className="card-body">
            <h2>{movie.title}</h2>
            <img src={movie.image_url} width="100px" height="150px" alt={movie.title} />
            <p>Description: {movie.description}</p>
            <p>Subgenre: {movie.subgenre}</p>
            <a href={`/movies/${movie.id}`}>
              <button>Go to show page</button>
            </a>
            <br></br>
          </div>
        </div>
      </div>
    ));

  

  return (
    <div>
<ul>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Subgenres
          </a>
          <ul className="dropdown-menu">
            {props.movies.map((movie) => (
              <li
                key={movie.id}
                onClick={() => handleSubgenreChange(movie.subgenre)}
                className="dropdown-item"
              >
                {movie.subgenre}
              </li>
            ))}
             <li onClick={() => handleSubgenreChange("")} className="dropdown-item">
              All
            </li>
          </ul>
        </li>
      </ul>


        <h4> Search filter:</h4> <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} list="title"/>
     
<div className="container">
      <h1>All Movies</h1>
      {filteredMovies}
      {props.movies.filter((movie) => movie.title.toLowerCase().includes(searchFilter.toLowerCase())).map((movie) => (
      <div key={movie.id} className="movies">
      <br></br>
     <div className="card">
       <div className="card-body">
       <h2>{movie.title}</h2>
           <img src={movie.image_url} width="100px" height="150px"/>
            <p>Description: {movie.description}</p>
            <p>Subgenre: {movie.subgenre}</p>
            <a href={`/movies/${movie.id}`}><button>Go to show page</button></a>
<br></br>

       </div>
      
     </div>
 </div>
         ))
         }
 </div>
 





</div>
    
    
  );
}