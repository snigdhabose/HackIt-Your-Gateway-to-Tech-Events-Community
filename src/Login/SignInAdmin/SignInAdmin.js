import React, { useState } from "react";
import * as client from "../client";
import "../SignUpUser/SignUpUser.css"
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
function SignInOrganizer() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: "", username: "" });
  const { attendee } = useParams();
  const signin = async () => {
    // Basic validation
    if (!credentials.username || !credentials.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await client.signinAdmin(credentials);
      const userId = String(response._id);
      setUser({ id: userId, username: response.username });
      console.log("USERID_SIGNIN",userId)
      navigate(`/admin/events/${userId}`);
      
   } catch (error) {
     // Handle sign-in failure (display error message, etc.)
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1 class="signup-heading">Sign In</h1>
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>

      {error && <p className="error-message">{error}</p>}
     
      <button className="signup-button" onClick={signin}>
        Sign In
      </button>
    </div>
  );
}

export default SignInOrganizer;
