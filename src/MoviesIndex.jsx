import { useState } from "react";

export function MoviesIndex(props) {
const [searchFilter, setSearchFilter] = useState("")

  return (
    <div>
         Search filter: <input type="text" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} list="title"/>
     
<div className="container">
      <h1>All Movies</h1>
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
 


      {/* //    <div key={movie.id}>
      //      <div className="col">
      //    <div className="card">
      //       <div className="card-body">
      //      <h2>{movie.title}</h2>
      //      <img src={movie.image_url} width="100px" height="150px"/>
      //      <p>Description: {movie.description}</p>
      //      <p>Subgenre: {movie.subgenre}</p>
      //      <a href={`/movies/${movie.id}`}><button>Go to show page</button></a>
      //    </div>
      //    </div>
      //    </div>
      //    </div>
      //  ))} */}
    </div>
    
  );
}