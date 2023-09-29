
export function Profile(props) {
// console.log(props.currentUser.movies.map(movie => movie.title))
  return(
<div>
  <img src={props.currentUser.image_url} width="150px" height="200px"/>
  <h2>{props.currentUser.name}</h2>
  <div>
    <h2>Favorites</h2>
    
{props.currentUser.movies.map((movie) => (
  <div key={movie.id}>
    
      <img src={movie.image_url} width="100px" height="150px"/>
    <h3>{movie.title}</h3>
    <p>Description: {movie.description}</p>
    <p>Subgenre: {movie.subgenre}</p>
    
    </div>
    ))}
</div>
</div>
  )
}
