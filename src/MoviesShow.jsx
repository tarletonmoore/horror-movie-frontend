import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import audio from "./assets/child_laugh.mp3";


export function MoviesShow(props) {
  const [movie, setMovie] = useState({ reviews: [] });
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [audioElement] = useState(new Audio(audio));


  const params = useParams();

  const playAudio = () => {
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }; 

  const getMovieData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
  console.log("inside if statement")
  window.location.href = "/login"
}
else{
  axios.get(`http://localhost:3000/movies/${params.id}.json`).then((response) => {
    setMovie(response.data);
    playAudio()
  });
  }
 
  };

  const checkIsFavorited = () => {
    axios.get("http://localhost:3000/favorites.json").then((response) => {
      const favorites = response.data;
      const favorite = favorites.find((fav) => fav.movie_id === params.id);
      if (favorite) {
        setIsFavorited(true);
        setFavoriteId(favorite.id);
      } else {
        setIsFavorited(false);
        setFavoriteId(null);
      }
    });
  };

  const handleAddReview = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
  
    axios
      .post("http://localhost:3000/reviews.json", params)
      .then((response) => {
        console.log(response.data);
  
        const newReview = response.data;
  
        setMovie((prevMovie) => ({
          ...prevMovie,
          reviews: [...prevMovie.reviews, newReview],
        }));
  
        event.target.elements.review.value = "";
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  useEffect(() => {
    getMovieData();
    checkIsFavorited(); 
  }, []);

  const handleToggleFavorite = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);

    if (isFavorited) 
    {
      axios.delete(`http://localhost:3000/favorites/${favoriteId}.json`).then(() => {
        setIsFavorited(false);
        setFavoriteId(null);
      });
    } else {
      axios.post("http://localhost:3000/favorites.json", params).then((response) => {
        setIsFavorited(true);
        setFavoriteId(response.data.id);
        window.location.href = "/me";

      });
    }
  };




  return (
    <div>
      <h1>Movie Info</h1>

      <div key={movie.id}>
        <div className="card">
          <div className="card-body">
            <h2>{movie.title}</h2>
            <img src={movie.image_url} width="100px" height="150px" alt={movie.title} />
            <p>Description: {movie.description}</p>
            <p>Subgenre: {movie.subgenre}</p>
            <form onSubmit={
              handleToggleFavorite
              }>
              <div>
                <input name="movie_id" type="hidden" defaultValue={params.id} />
                {isFavorited ? (
                  <>
                    <input name="favorite_id" type="hidden" defaultValue={favoriteId} />
                    <button type="button" onClick={
                      handleToggleFavorite
                      }>
                      Remove from Favorites
                    </button>
                  </>
                ) : (
                  <button type="submit">
                    Add to Favorites
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <div className="card">
        <div className="card-body">
           <h3>Reviews</h3>
           {movie.reviews.map((rev) => (
             <div key={rev.id}>
               <p>
                 {rev.user.name}: {rev.review}
               </p>
             </div>
           ))}
           <form onSubmit={handleAddReview}>
             <div>
               <input name="movie_id" type="hidden" defaultValue={params.id} />
             </div>
             <div>
               Review: <input defaultValue={movie.review} name="review" type="text" />
             </div>
             <br></br>
             <button>Add Review</button>
           </form>
                </div>
    </div>
    </div>
    </div>
  );
}

