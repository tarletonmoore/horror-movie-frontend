import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";

export function Header() {
  let authenticationLinks;

  if (localStorage.jwt === undefined) {
authenticationLinks = (
  <>
  <li className="nav-item">
  <Link to="/signup" className="nav-link" >Signup</Link>

</li>
<li className="nav-item">
  <Link to="/login" className="nav-link" >Login</Link>

</li>
</>
)
  } else {
    authenticationLinks = (
      <>
        <li className="nav-item">
          <LogoutLink />

        </li>
       
      </>
    )
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/products">Home</a>
        </li>
              {authenticationLinks}
      <li className="nav-item">
          <Link to="/movies" className="nav-link" >All Movies</Link>

        </li>
    
      </ul>
    
    </div>
  </div>
      </nav>
    </header>
  )
}