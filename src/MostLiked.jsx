import { useState, useEffect } from "react"
import axios from "axios"

export function MostLiked() {
  const [mostLiked, setMostLiked] = useState([])
const getMostLiked = () => {
  axios.get("http://localhost:3000/movies/most_liked.json").then((response) => {
    console.log(response.data)
    setMostLiked(response.data)
  })
}
useEffect(getMostLiked, [])
  return(
    <div>
    <h1 className="likedheader">Most Favorited</h1>
    <ol>
   {mostLiked.map((movie) => (
    
      <div key={movie.id}>
<div className="card">
          <div className="card-body">
          <li>
            <h2>{movie.title}</h2>
            <img src={movie.image_url} width="100px" height="150px" alt={movie.title} />
            <p>Description: {movie.description}</p>
            <p>Subgenre: {movie.subgenre}</p>
            <a href={`/movies/${movie.id}`}>
                    <button>Go to show page</button>
                  </a>
            </li>

        </div>
        </div>
        <br></br>
        </div>
    ))}
    </ol>
    </div>
  )
}