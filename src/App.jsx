import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Header />
    <br></br>
    <Content />
    <br></br>
    <Footer />
    </BrowserRouter>
  </div>
  )
}

export default App;