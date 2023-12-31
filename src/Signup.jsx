import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <div className="card">
        <div className="card-body">
          <h1 className="signup">Signup</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div>
              <p className="signupname"> Name: <input name="name" type="text" /></p>
            </div>
            <div>
              <p className="signupimage"> Image URL: <input name="image_url" type="text" /></p>
            </div>
            <div>
              <p className="signupemail">Email: <input name="email" type="email" /></p>
            </div>
            <div>
              <p className="signuppass">Password: <input name="password" type="password" /></p>
            </div>
            <div>
              <p> Password confirmation: <input name="password_confirmation" type="password" /></p>
            </div>
            <button type="submit" style={{ "backgroundColor": "white" }}>Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}