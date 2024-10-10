import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as client from "../Profile/client";
import "./Dashboard.css";
import Navbar from "./Navbar";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
    _id: "",
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userid = useParams().id;
  console.log("id", userid);

  const bgImage = {
    // backgroundImage: `url(${coverImage})`,
  };

  const fetchCurrentUserDetails = async (userid) => {
    // console.log("proile id", userid)
    try {
      const account = await client.fetchCurrentUserDetails(userid);
      console.log("account", account);
      setUser(account);
      // console.log("client response", account);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const allUsers = await client.findAllUsers();

      // Assuming each user object has a 'role' property
      const filteredUsers = allUsers.filter((user) => (user.role === "user" || user.role === "organizer"));

      console.log("Filtered Users:", filteredUsers);

      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error appropriately
    }
  };

  const getRandomTransparentGradientColor = () => {
    // Generate a random transparent gradient color
    const letters = "0123456789ABCDEF";
    const color1 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.8)`;
    const color2 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.8)`;
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log("user id for delete ", userId);
      // Call your delete user API endpoint
      await client.deleteUser(userId);

      // After successful deletion, update the users state
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUserDetails(userid);
  }, [userid]);

  console.log(users);
  return (
    <div className="entire-page">
      <div>
        {/* Main Content */}
        <div className="main-content">
          {/* Horizontal Navbar */}
          <div className="navbar-horizontal">
            <Navbar userid={userid} />
          </div>

          <div className="profile-content">
            {/* <!-- Top navbar --> */}
            <nav
              className="navbar navbar-top navbar-expand-md navbar-dark"
              id="navbar-main"
            >
              <div className="container-fluid">
                <form className="navbar-search navbar-search-dark form-inline  d-none d-md-flex ml-lg-auto">
                  <div className="form-group mb-0"></div>
                </form>
                <ul
                  className="navbar-nav align-items-center d-none d-md-flex"
                  style={{ color: "white" }}
                >
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link pr-0"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></a>

                    <div
                      id="myDropdown"
                      className="dropdown-menu dropdown-menu-arrow dropdown-menu-right"
                    >
                      <div className=" dropdown-header noti-title">
                        <h6 className="text-overflow m-0">Welcome!</h6>
                      </div>
                      <a href="../examples/profile.html" className="dropdown-item">
                        <i className="ni ni-single-02"></i>
                        <span>My profile</span>
                      </a>
                      <a href="../examples/profile.html" className="dropdown-item">
                        <i className="ni ni-settings-gear-65"></i>
                        <span>Settings</span>
                      </a>
                      <a href="../examples/profile.html" className="dropdown-item">
                        <i className="ni ni-calendar-grid-58"></i>
                        <span>Activity</span>
                      </a>
                      <a href="../examples/profile.html" className="dropdown-item">
                        <i className="ni ni-support-16"></i>
                        <span>Support</span>
                      </a>
                      <div className="dropdown-divider"></div>
                      <a href="#!" className="dropdown-item">
                        <i className="ni ni-user-run"></i>
                        <span>Logout</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12 order-xl-1">
                  <div className="p-card shadow">
                    <div className="p-card-header border-0 mt-7">
                      <div className="row align-items-center">
                        <div className="col-md-8">

                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-card-body">
                      <div className="row">
                        {filteredUsers && filteredUsers.map((user) => (
                          // <div>{JSON.stringify(user)}</div>

                          
                          <div key={user._id} className="col-lg-3 col-md-6 mb-4">
                            
                            <div className="user-card">
                              <div className="user-details">
                                <span className="user-avatar">
                                  {/* You can add a different icon or styling here */}
                                  {user.username.charAt(0)}
                                </span>
                                
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2em' }} className="user-username">
                                  {user.username}
                                </p>

                              </div>
                              <div className="user-actions">
                                <Link
                                  to={`/profile/${userid}/publicProfile/${user._id}`}
                                  className="btn btn-info"
                                >
                                  View Profile
                                </Link>
                                <button
                                  className="btn btn-danger ml-2"
                                  onClick={() => {
                                    handleDeleteUser(user._id)
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};
export default AdminUsers;