import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export function MoviesShow() {
  const [movie, setMovie] = useState({reviews: []})

  const params = useParams()

  const getMovieData = () => {
    console.log(params)       
    axios.get(`http://localhost:3000/movies/${params.id}.json`).then(response => {
      console.log(response.data)
      setMovie(response.data)
    })
  }

  const handleAddToFavorite =  (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    console.log('adding to favorites')
    axios.post("http://localhost:3000/favorites.json", params).then(response => {
      console.log(response.data)
      window.location.href = '/me'
    })
  }

  const handleAddReview =  (event) => {
    event.preventDefault()
    const params = new FormData(event.target);

    console.log('adding to reviews')
    axios.post("http://localhost:3000/reviews.json", params).then(response => {
      console.log(response.data)
      window.location.reload(false)
    })
  }

  useEffect(getMovieData, [])
  return(
    <div>
    <h1>Movie Info</h1>
     
       <div key={movie.id}>
         <h2>{movie.title}</h2>
         <img src={movie.image_url} width="100px" height="150px"/>
         <p>Description: {movie.description}</p>
         <p>Subgenre: {movie.subgenre}</p>
         <form onSubmit={handleAddToFavorite}>
       
       <div>
         <input name="movie_id" type="hidden" defaultValue={params.id} />
       </div>
    
       <button>Favorite</button>  
     </form>
     <br></br>
         <h3>Reviews</h3>
         {movie.reviews.map((rev) => (
          <div key={rev.id}>
            <p>{rev.user.name}: {rev.review}</p>
            </div>
         ))}
             <form onSubmit={handleAddReview}>
       
       <div>
         <input name="movie_id" type="hidden" defaultValue={params.id} />
       </div>
       <div>
           Review: <input defaultValue={movie.review} name="review" type="text" />
         </div>
       <button>Add Review</button>  
     </form>
       </div>
     
  </div>

  )
}