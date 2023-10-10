import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export function MostLiked() {
  const [mostLiked, setMostLiked] = useState([])
  const getMostLiked = () => {
    if (localStorage.jwt === undefined && window.location.href !== "/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("/movies/most_liked.json").then((response) => {
        setMostLiked(response.data)
      })
    }

  }
  useEffect(getMostLiked, [])
  return (
    <div>
      <h1 className="likedheader">Most Liked</h1>
      <ol>
        {mostLiked.map((movie) => (

          <div key={movie.id}>
            <div className="card">
              <div className="card-body">
                <li className="likedlist">
                  <img src={movie.image_url} width="100px" height="150px" alt={movie.title} />
                  <br></br>
                  <br></br>
                  <h2>{movie.title}</h2>

                  <p>Description: {movie.description}</p>
                  <p>Subgenre: {movie.subgenre}</p>

                  <Link to={`/movies/${movie.id}`}>
                    <button className="showbutton">Go to show page</button>
                  </Link>
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