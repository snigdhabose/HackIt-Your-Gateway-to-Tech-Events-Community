import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import coverImage from '../../images/background.jpeg';
import '../../Profile/Profile.css';
import '../Users/Users.css';
import profileImage from '../../images/profile.jpeg';
import * as client from "../client";
const Users = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER", _id:"" });
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const userid = useParams().id;
    console.log("id",userid)

    const bgImage = {
        backgroundImage: `url(${coverImage})`,
    };
    
    const fetchCurrentUserDetails = async (userid) => {
        // console.log("proile id", userid)
        try {
            const account = await client.fetchCurrentUserDetails(userid);
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
          const filteredUsers = allUsers.filter(user => user.role === 'user');
      
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
        const letters = '0123456789ABCDEF';
        const color1 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
        const color2 = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`;
        return `linear-gradient(45deg, ${color1}, ${color2})`;
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filtered = users.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      };
    // const aboutMe;
    // const phoneNumber;
  

    useEffect(() => { fetchUsers(); fetchCurrentUserDetails(userid);}, [userid]);
    
    return (

        <div className='profile'>
        {/* <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet"></link> */}
        <div className="profile-content">
            {/* <!-- Top navbar --> */}
            <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                <div className="container-fluid">
                    {/* <!-- Brand --> */}
                    <Link to = {`/${userid}`} className="p-h4 mb-0 mr-2 p-text-white text-uppercase d-none d-lg-inline-block" >Home</Link>
                        <Link to = {`/profile/${userid}`} className="p-h4 ml-2 mb-0 p-text-white text-uppercase d-none d-lg-inline-block" >My profile</Link>
                        <Link to={`/users/${userid}`} className="p-h4 ml-2 mb-0 p-text-white text-uppercase d-none d-lg-inline-block" >
  Users
</Link>
                    {/* <!-- Form --> */}
                    <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <div className="form-group mb-0">
                            <div className="input-group input-group-alternative">
                               
                            </div>
                        </div>
                    </form>
                    {/* <!-- User --> */}
                    <ul className="navbar-nav align-items-center d-none d-md-flex" style={{color: 'white'}}>
                        <li className="nav-item dropdown">
                        
                            <a className="nav-link pr-0" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="media align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src={profileImage}/>
                                    </span>
                                    <div className="media-body ml-2 d-none d-lg-block">
                                        <span className="mb-0 text-sm  font-weight-bold">{user.firstName}{" "}{user.lastName}</span>
                                    </div>
                                </div>
                            </a>
                       
                            <div id="myDropdown" className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
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
            {/* <!-- Header --> */}
            <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center cover-image" style={bgImage}>
                {/* <!-- Mask --> */}
                <span className="mask bg-gradient-default opacity-8"></span>
                {/* <!-- Header container --> */}
                <div className="container-fluid d-flex align-items-center">
                    <div className="row">
                        <div className="col-lg-7 col-md-10">
                            <h1 className="p-display-2 p-text-white">Hello {user.username}</h1>
                            <p className="p-text-white mt-0 mb-5">This is the users screen you can search and view other user profiles.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Page content --> */}
            <div className="container-fluid mt--7">
                <div className="row">
                   
                    <div className="col-xl-12 order-xl-1">
                        <div className="p-card shadow">
                        <div className="p-card-header border-0">
  <div className="row align-items-center">
    <div className="col-md-8">
      <h3>Users</h3>
    </div>
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search Users"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  </div>
</div>

                            <div className="p-card-body">
{/* insert user icons here */}
<div className="p-card-body">
                                {/* Insert user icons here */}
                                <div className="row">
                                    {filteredUsers.map((user) => (
                                        <div key={user._id} className="col-lg-3 col-md-6 mb-4">
                                           <Link to={`/profile/${userid}/publicProfile/${user._id}`} className="text-center">

                                                <div className="avatar-container">
                                                <span
                                                        className="avatar avatar-lg rounded-circle"
                                                        style={{ background: getRandomTransparentGradientColor() }}
                                                    >
                                                        {user.username.charAt(0).toUpperCase()} 
                                                    </span>
                                                    <p style={{color:'white'}} className="mt-2 mb-0">{user.username}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                <br/><br/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    );

}
export default Users;