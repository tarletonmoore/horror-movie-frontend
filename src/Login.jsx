import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/movies";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  const handleDemoLogin = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/movies";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <div className="card">
        <div className="card-body">
          <h1 className="login">Login</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} >
            <div>
              <p className="loginemail"> Email: <input name="email" type="email" /></p>
            </div>
            <div>
              <p> Password: <input name="password" type="password" /></p>
            </div>
            <button type="submit" style={{ "backgroundColor": "white" }}>Login</button>
          </form>
          <h1 className="demolabel">Click Here To Login On Demo Account</h1>

          <form onSubmit={handleDemoLogin} className="demologin">
            <div>
              <input name="email" type="hidden" value="john@sense.com" />
            </div>
            <div>
              <input name="password" type="hidden" value="password" />
            </div>
            <button type="submit" style={{ "backgroundColor": "white" }}>Demo Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}