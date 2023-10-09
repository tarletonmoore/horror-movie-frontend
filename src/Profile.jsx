import axios from "axios";
import { MovieRecommendations } from "./MovieRecommendations";
import { useState, useEffect } from "react";

export function Profile(props) {
  const [recommendations, setRecomendations] = useState([])


  const handleDestroyFavorite = (id) => {
    axios.delete(`http://localhost:3000/favorites/${id}.json`).then((response) => {
      const updatedFavorites = props.currentUser.favorites.filter(
        (fav) => fav.id !== id
      );
      props.setCurrentUser({
        ...props.currentUser,
        favorites: updatedFavorites,
      });
    });
  };


  const getRecommendations = () => {
    axios.get("http://localhost:3000/movies/recommendations.json").then(response => {
      setRecomendations(response.data)
    })
  }

  useEffect(getRecommendations, [])

  return (
    <div>
      <img src={props.currentUser.image_url} width="150px" height="200px" />
      <h2 className="profileheader">{props.currentUser.name}</h2>
      <div>
        <h2 className="profilefav">Favorites</h2>
        {props.currentUser.favorites.map((fav) => (

          <div key={fav.id}>
            <div className="card">
              <div className="card-body">

                <img src={fav.movie.image_url} width="100px" height="150px" />
                <br></br>
                <br></br>
                <h2>{fav.movie.title}</h2>

                <p>Description: {fav.movie.description}</p>
                <p>Subgenre: {fav.movie.subgenre}</p>
                <button onClick={() => { handleDestroyFavorite(fav.id) }} className="removebutton">Remove</button>

              </div>
            </div>
            <br></br>
          </div>

        ))}


      </div>
      <MovieRecommendations recommendations={recommendations} />
    </div>
  )
}
