import React, { useState } from "react";
import * as client from "../client";
import "../SignUpUser/SignUpUser.css"
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
function SignUpUser() {
  const [credentials, setCredentials] = useState({ username: "", password: "" , role: "user"});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: "", username: "" });
  const signup = async () => {
    // Basic validation
    if (!credentials.username || !credentials.password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response=await client.signup(credentials);
      console.log("respp",response)
     // if(response.username){
      const userId = String(response._id);
      console.log("API Response", userId);
      setUser({ id: userId, username: response.username });
      console.log("USERID_SIGNUP",userId)
     navigate(`/signup/details/${userId}`);
     // }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Username already exists
        setError("Username already taken.");
      } else {
        // Handle other sign-up failures
        setError("Sign-up failed. Please try again.");
      }
    }
  };


  return (
    <div className="signup-container">
      <h1 class="signup-heading">Sign Up</h1>
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
     
      <button className="signup-button" onClick={signup}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUpUser;
