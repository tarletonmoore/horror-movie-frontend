import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom";
import { MoviesIndex } from "./MoviesIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";


export function Content() {
const [movies, setMovies] = useState([])

const handleIndexMovies = () => {
       axios.get("http://localhost:3000/movies.json").then((response) => {
         console.log(response.data);
         setMovies(response.data);
       });
     };
  
    useEffect(handleIndexMovies, []);
  return (
    <div>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
<Route path="/movies" element={<MoviesIndex movies={movies}/>
} />
      </Routes>
    </div>
  )
}