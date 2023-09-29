import axios from "axios";

export function Profile(props) {
  const handleDestroyFavorite = (favorite) => {
    console.log("handleDestroyFavorite", favorite);
    console.log(props.currentUser.favorites.map(f => f.id))
    // axios.delete(`http://localhost:3000/favorites/2.json`).then((response) => {
    //   // setFavorites(favorites.filter((f) => f.id !== favorite.id));
    //   window.location.href = '/me'
    //  });
  };
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
    <button onClick={() => {handleDestroyFavorite()}}>Click</button>
    </div>
    ))}
</div>
</div>
  )
}
