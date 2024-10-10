// Navbar.js
import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import logoImage from "../images/Screenshot 2023-12-14 at 6.55.24 PM.png";

const Navbar = ({ userid }) => {
  // console.log("userid", account.role);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const signout = async () => {
    await client.signout();
    navigate("/");
  };

  const fetchCurrentUserDetails = async (userid) => {
    console.log("userid navbar ", userid);
    try {
      // console.log("userid", userid);
      const account = await client.fetchCurrentUserDetails(userid);
      console.log("account", account);
      setAccount(account);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUserDetails(userid);
  }, [userid]);

  const { username, role } = account || {};

  return (
    <div className="navbar-content">
      {/* Left side of the navbar */}
      <div className="navbar-left">

        {account ? (
          <>
            {account.role === "admin" && (
              <>
                <Link
                  to={`/admin/events/${userid}`}
                  className="navbar-left-button"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  to={`/admin/users/${userid}`}
                  className="navbar-left-button"
                  style={{ textDecoration: "none" }}
                >
                  Users
                </Link>
              </>
            )}
            {account.role === "user" && (
              <>
                <Link
                  to={`/${userid}`}
                  className="navbar-left-button"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
                <Link
                  to={`/${userid}/about`}
                  className="navbar-left-button"
                  style={{ textDecoration: "none" }}
                >
                  About
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <Link
              to={`/`}
              className="navbar-left-button"
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
            <Link
              to={`/about`}
              className="navbar-left-button"
              style={{ textDecoration: "none" }}
            >
              About
            </Link>
          </>
        )}



        {account && account.role === "organizer" && (
          <>
            <Link
          to={`/${userid}`}
          className="navbar-left-button"
          style={{ textDecoration: "none" }}
        >
          Home
        </Link>
            <Link
              to={`/${userid}/myEvents`}
              className="navbar-left-button"
              style={{ textDecoration: "none" }}
            >
              My Events
            </Link>
            <Link
          to={`/${userid}/about`}
          className="navbar-left-button"
          style={{ textDecoration: "none" }}
        >
          About
        </Link>
          </>
        )}
      </div>

      {/* Right side of the navbar */}
      <div className="navbar-right">
        {userid ? (
          <>
            <div className="navbar-right-button" onClick={signout}>
              <Link className="link-style" style={{ textDecoration: "none" }}>
                Sign Out
              </Link>
            </div>
            {/* If user logged in only show the profile and signout button */}
            <Link to={`/profile/${userid}`} style={{ textDecoration: "none" }}>
              <span className="profile-icon">
                <FiUser />{" "}
                {account && (
                  <span style={{ fontSize: "18px" }}>{account.username}</span>
                )}
              </span>
            </Link>
          </>
        ) : (
          <>
            {/* If user not logged in, show the sign in and sign out button */}
            <Link
              className="navbar-right-button"
              to={`/Dashboard/signIn`}
              style={{ textDecoration: "none" }}
            >
              Sign In
            </Link>
            <Link
              className="navbar-right-button"
              to={`/Dashboard/signUp`}
              style={{ textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
