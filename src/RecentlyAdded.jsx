import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export function RecentlyAdded() {
  const [recentlyAdded, setRecentlyAdded] = useState([])

  const getRecentlyAdded = () => {

    axios.get("/movies/recently_added").then(response => {
      setRecentlyAdded(response.data)
    })
  }

  useEffect(getRecentlyAdded, [])
  return (
    <div>
      <h1 className="recentheader">Recently Added Movies</h1>
      {recentlyAdded.map((recent) => (
        <div key={recent.id}>
          <div className="card">
            <div className="card-body">
              <img src={recent.image_url} width="100px" height="150px" />
              <h2>{recent.title}</h2>
              <p>Description: {recent.description}</p>
              <p>Subgenre: {recent.subgenre}</p>
              <Link to={`/movies/${recent.id}`}>
                <button className="showbutton">Go to show page</button>
              </Link>

            </div>
          </div>
          <br></br>
        </div>
      ))}
    </div>
  )
}