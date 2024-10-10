// Home.js
import Slider from "react-slick";
import "./LoginHome.css"; // Make sure to adjust the path according to your project structure
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link,useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
const LoginHome = (props) => {
 const { pathname } = useLocation();
 const linkTo = pathname.includes('signIn') ? '/signin' : '/signup';

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const yourStateData = { key: 'value' };
  return (
    <div className="homepage-container">
      <div className="image-container">
        <Slider {...carouselSettings}>
          <div>
            <img
              src="https://www.techrepublic.com/wp-content/uploads/2022/05/top-5-conferences-2022-tom.jpeg"
              alt="Event Management 1"
              className="display-photo"
            />
          </div>
          <div>
            {/* Add more images for the carousel */}
            <img
              src="https://www.smu.edu/-/media/Site/Meadows/NewsStories/2023/Bisk-SMU-New-Masters-Program/Creative-Technology-girl-wearing-VR-Goggles.png?h=879&iar=0&w=1500&hash=0058A9ED13C0ED8DAD18774891EB8D19"
              alt="Event Management 2"
              className="display-photo"
            />
          </div>
          <div>
            {/* Add more images for the carousel */}
            <img
              src="https://assets-global.website-files.com/5f3ee1d2675aae62f4e3db92/5f3f253595543a53577a0bd0_5e79016d6411421905d3af21__MToAeugdi0vA7qht75qUb8srfnq2lW6UXQQthhBfTi2j9jSLHgbOQLQQcT_MIU-akvKUL7JfC6kFpmTHnHQeHz6mUjg8-AM1ctpxwkQ0_783XsL0P5mnIHisqbKsVGF5OidBlc.jpeg"
              alt="Event Management 2"
              className="display-photo"
            />
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </div>
      <div className="user-selection-container">
        
            <h1 style={{color:'white'}}>Welcome to HackIt!</h1>
            <p>Which role suits you best?</p>
            <div className="role-buttons">
            <Link to={`${linkTo}/organizer`}>
      <button
        style={{ marginRight: '20px' }}
        className="button-49"
        role="button"
      >
        Organizer
      </button>
      </Link>

      <Link to={`${linkTo}/user`}>
  <button
    style={{ marginRight: '20px' }}
    className="button-49"
    role="button"
  >
    Attendee
  </button>
</Link>
            </div>
            <br />

            <Link to={`/`}>
              <p style={{ fontSize: "1em" }}>
                Continue without Logging in
              </p>
            </Link>
 
      </div>
    </div>
  );
};

export default LoginHome;
