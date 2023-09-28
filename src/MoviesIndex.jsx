export function MoviesIndex(props) {
  return (
    <div>
      <h1>All Movies</h1>
       {props.movies.map((movie) => (
         <div key={movie.id}>
           <h2>{movie.title}</h2>
           <img src={movie.image_url} width="100px" height="150px"/>
           <p>Description: {movie.description}</p>
           <p>Subgenre: {movie.subgenre}</p>
         </div>
       ))}
    </div>
  );
}