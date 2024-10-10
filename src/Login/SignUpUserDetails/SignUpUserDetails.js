import React, { useState } from "react";
import * as client from "../client";
import "../SignUpUser/SignUpUser.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function SignUpUserDetails() {
  const userid = useParams().id;
  console.log("id", userid);
  const [credentials, setCredentials] = useState({
    id: userid,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: userid,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });

  const save = async () => {
    if (credentials.firstName && credentials.lastName && credentials.email) {
      try {
        const response = await client.updateUser(credentials);
        setUser({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email
        });
        // Assuming `navigate` is a function to navigate to a specific route
        navigate(`/${userid}`);
      } catch (error) {
        // Handle error if the update fails
        console.error("Error updating user:", error);
        setError("Failed to update user. Please try again.");
      }
    } else {
      // Show an error message or take appropriate action if any of the required values is missing
      console.error("Missing required values. Cannot save.");
      setError("Please fill in all required fields.");
    }
  };

  return (
    <div className="details-container">
      <h1 className="signup-heading">Sign Up</h1>
      <div className="input-container">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={credentials.firstName}
          onChange={(e) =>
            setCredentials({ ...credentials, firstName: e.target.value })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={credentials.lastName}
          onChange={(e) =>
            setCredentials({ ...credentials, lastName: e.target.value })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="email">Email ID:</label>
        <input
          type="text"
          id="email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </div>
      <div className="input-container">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={credentials.phoneNumber}
          onChange={(e) =>
            setCredentials({ ...credentials, phoneNumber: e.target.value })
          }
        />
      </div>
      <br />
      {error && <p className="error-message">{error}</p>}

      <button className="signup-button" onClick={save}>
        Save
      </button>
    </div>
  );
}

export default SignUpUserDetails;
