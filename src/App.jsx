import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";
import BackgroundMusic from "./BackgroundMusic";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([])

  const handleIndexMovies = () => {
    if (localStorage.jwt === undefined && window.location.href !== "http://localhost:5173/login") {
      window.location.href = "/login"
    }
    else {
      axios.get("http://localhost:3000/movies.json").then((response) => {
        setMovies(response.data);
      });
    }
  };

  useEffect(handleIndexMovies, []);

  return (
    <div className="container">
      <BackgroundMusic />
      <BrowserRouter>
        <Header movies={movies} />
        <br></br>
        <Content movies={movies} />
        <br></br>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;