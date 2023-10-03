import axios from "axios";

export function Profile(props) {


  console.log(props.currentUser.favorites)
  const handleDestroyFavorite = (id) => {
    console.log("handleDestroyFavorite", id);
    console.log(props.currentUser.favorites.map(f => (f.id)))
    axios.delete(`http://localhost:3000/favorites/${id}.json`).then((response) => {
      window.location.href = '/me'
     });
  };
 return(
<div>
  <img src={props.currentUser.image_url} width="150px" height="200px"/>
  <h2>{props.currentUser.name}</h2>
  <div>
    <h2>Favorites</h2>
    {props.currentUser.favorites.map((fav) => (
      
<div key={fav.id}>
<div className="card">
       <div className="card-body">
    <img src={fav.movie.image_url} width="100px" height="150px"/>
  <h3>{fav.movie.title}</h3>
  <p>Description: {fav.movie.description}</p>
  <p>Subgenre: {fav.movie.subgenre}</p>
  <button onClick={() => {handleDestroyFavorite(fav.id)}}>Remove</button>
  </div>      
  </div>
  <br></br>
</div>

      ))}


</div>
</div>
  )
}
