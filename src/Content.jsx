import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom";
import { MoviesIndex } from "./MoviesIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { MoviesShow } from "./MoviesShow";
import { MostLiked } from "./MostLiked";

export function Content({movies}) {
// const [movies, setMovies] = useState([])
const [currentUser, setCurrentUser] = useState({favorites: [], movies: []})


// const handleIndexMovies = () => {
//        axios.get("http://localhost:3000/movies.json").then((response) => {
//          console.log(response.data);
//          setMovies(response.data);
//        });
//      };

    const userData = () => {
      axios.get("http://localhost:3000/me.json").then((response) => {
        console.log(response.data);
         setCurrentUser(response.data);
      });
  
    }


  useEffect(userData, [])
    // useEffect(handleIndexMovies, []);
  return (
    <div>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
<Route path="/movies" element={<MoviesIndex movies={movies}/>} />
<Route path="/me" element={<Profile currentUser={currentUser}  />} />
<Route path="/movies/:id" element={<MoviesShow />} />
<Route path="/movies/most_liked" element={<MostLiked />} />
      </Routes>
    </div>
  )
}