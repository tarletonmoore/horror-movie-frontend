import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import audio from "./assets/child_laugh.mp3";
import whispers from "./assets/whispers2.mp3";
import { Modal } from "./Modal";
import { ReviewsUpdate } from "./ReviewUpdate";
import { StarRating } from "./StarRating";

export function MoviesShow(props) {
  const [movie, setMovie] = useState({ reviews: [] });
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [whisperElement] = useState(new Audio(whispers));
  const [audioElement] = useState(new Audio(audio))
  const [isReviewUpdateVisible, setIsReviewUpdateVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState({});


  const handleUpdateReview = (id, params) => {
    axios
      .patch(`/reviews/${id}.json`, params)
      .then((response) => {
        const updatedReviewData = response.data;

        setCurrentReview(updatedReviewData);

        setMovie((prevMovie) => {
          const updatedReviews = prevMovie.reviews.map((review) => {
            if (review.id === updatedReviewData.id) {
              return updatedReviewData;
            }
            return review;
          });

          return {
            ...prevMovie,
            reviews: updatedReviews,
          };
        });

        setIsReviewUpdateVisible(false);
      })
      .catch((error) => {
        console.error('Error updating review:', error);
      });
  };


  const handleDestroyReview = (review) => {
    axios.delete(`/reviews/${review.id}.json`)
      .then((response) => {

        setMovie((prevMovie) => ({
          ...prevMovie,
          reviews: prevMovie.reviews.filter((r) => r.id !== review.id),
        }));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };


  const handleClick = (rev) => {
    handleDestroyReview(rev);
  };


  const handleShowReview = (review) => {
    setIsReviewUpdateVisible(true);
    setCurrentReview(review);
  };

  const handleClose = () => {
    setIsReviewUpdateVisible(false);
  };

  const params = useParams();

  const playWhisper = () => {
    whisperElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const playAudio = () => {
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const getMovieData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login" &&
      window.location.href !== "https://horror-movie-frontend.onrender.com/login") {
      window.location.href = "/login"
    }
    else {
      axios.get(`/movies/${params.id}.json`).then((response) => {
        setMovie(response.data);
        playWhisper()
      });
    }

  };

  const checkIsFavorited = () => {
    axios.get("/favorites.json").then((response) => {
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
      .post("/reviews.json", params)
      .then((response) => {
        playAudio()
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

    if (isFavorited) {
      axios.delete(`/favorites/${favoriteId}.json`).then(() => {
        setIsFavorited(false);
        setFavoriteId(null);
      });
    } else {
      axios.post("/favorites.json", params).then((response) => {
        setIsFavorited(true);
        setFavoriteId(response.data.id);
        window.location.href = "/me";

      });
    }
  };

  const handleAddRating = (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    axios.post("/ratings.json", params).then(response => {
      window.location.reload()

    })
  }

  const ratingsForMovie = props.ratings.filter((r) => r.movie.id === movie.id);
  const totalRatings = ratingsForMovie.length;
  const sumRatings = ratingsForMovie.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;



  return (
    <div>
      <h1 className="showheader">Movie Info</h1>

      <div key={movie.id}>
        <div className="card">
          <div className="card-body">
            <h2>{movie.title}</h2>
            <img src={movie.image_url} width="100px" height="150px" alt={movie.title} />
            <p>Description: {movie.description}</p>
            <p>Subgenre: {movie.subgenre}</p>
            <h4 className="averageheader">Average Rating:</h4>
            {averageRating > 0 ? (
              <div>
                <StarRating rating={averageRating} />
                <p>Ratings: {totalRatings}</p>
              </div>
            ) : (
              <p>No ratings yet.</p>
            )}

            <form onSubmit={handleAddRating}>
              <div className="rating-input-container">
                <select name="rating">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <button type="submit" className="ratingbutton">Add rating</button>
              </div>
              <div>
                <input name="movie_id" type="hidden" defaultValue={movie.id} />
              </div>
            </form>

            <br></br>
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
                  <button type="submit" className="favoritesbutton">
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
            <h2>Reviews</h2>
            {movie.reviews.map((rev) => (
              <div key={rev.id}>
                <p>
                  {rev.user.name}: {rev.review}
                </p>
                {rev.user.id === props.currentUser.id && (
                  <>
                    <button onClick={() => handleShowReview(rev)} className="reviewbutton">Change Review</button>
                    <button onClick={() => handleClick(rev)} className="reviewbutton">Delete Review</button>
                  </>
                )}
                <Modal show={isReviewUpdateVisible} onClose={handleClose}>
                  <ReviewsUpdate review={currentReview} onUpdateReview={handleUpdateReview} />
                </Modal>
                <br></br>
                <br></br>
              </div>
            ))}
            <br></br>
            <form onSubmit={handleAddReview}>
              <div>
                <input name="movie_id" type="hidden" defaultValue={params.id} />
              </div>
              <div>
                <p>Review: <input defaultValue={movie.review} name="review" type="text" /></p>
              </div>
              <br></br>
              <button className="reviewbutton">Add Review</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

