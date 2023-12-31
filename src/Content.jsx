import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom";
import { MoviesIndex } from "./MoviesIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { MoviesShow } from "./MoviesShow";
import { MostLiked } from "./MostLiked";
import { RecentlyAdded } from "./RecentlyAdded";
import { MoviesList } from "./MoviesList"

export function Content({ movies }) {
  const [currentUser, setCurrentUser] = useState({ favorites: [], movies: [] })
  const [ratings, setRatings] = useState([])

  const userData = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login" &&
      window.location.href !== "https://horror-movie-frontend.onrender.com/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("/me.json").then((response) => {
        setCurrentUser(response.data);
      });
    }

  }

  const ratingsData = () => {
    axios.get("/ratings.json").then((response) => {
      setRatings(response.data)
    })
  }

  useEffect(userData, [])
  useEffect(() => {
    ratingsData();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MoviesIndex movies={movies} />} />
        <Route path="/me" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/movies/:id" element={<MoviesShow currentUser={currentUser} setCurrentUser={setCurrentUser} ratings={ratings} />} />
        <Route path="/movies/most_liked" element={<MostLiked />} />
        <Route path="/movies/recently_added" element={<RecentlyAdded />} />
        <Route path="/now_playing" element={<MoviesList />} />
      </Routes>
    </div>
  )
}