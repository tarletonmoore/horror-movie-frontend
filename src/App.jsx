import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";


import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([])

  const handleIndexMovies = () => {
    axios.get("http://localhost:3000/movies.json").then((response) => {
      console.log(response.data);
      setMovies(response.data);
    });
  };

  useEffect(handleIndexMovies, []);

  return (
    <div className="container">
    <BrowserRouter>
    <Header movies={movies}/>
    <br></br>
    <Content movies={movies}/>
    <br></br>
    <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App;