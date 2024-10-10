import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import EventCard from "./EventCard";
import OrganizerCard from "./OrganizerDashboard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as client from "./client";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Events from "../ExternalApi/Events";


// import "./Dashboard.css";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState({ localEvents: [], externalEvents: [] });
  const location = useLocation();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const userid = useParams().id;
  const id1 = useParams().id;

  const fetchEvents = async (searchTerm) => {
    const events = await client.findAllEvents();
    setEvents(events);
    setFilteredEvents(events);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (eventID) => {
    const response = await client.deleteEvent(eventID);
    console.log("response", response);
    fetchEvents();
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
  };

  const setSearchTerms = (e) => {
    setSearchTerm(e);
    const filtered = events.filter((event) => {
      return event.eventName?.toLowerCase().includes(e.toLowerCase());
    });
    setFilteredEvents(filtered);
  };
  return (

    <div className="entire-page">
      <div>
        {/* Main Content */}
        <div className="main-content">
          {/* Horizontal Navbar */}
          <div className="navbar-horizontal">
            <Navbar userid={userid} />
          </div>

          {/* Slider Carousel */}
          <Slider {...carouselSettings}>
            <div>
              <img
                src="https://www.aami.org/images/default-source/htm/htm-week/htm24emailheader.jpg?sfvrsn=aebdf854_3"
                alt="Event Management 1"
                className="display-photo1"
              />
            </div>
            <div>
              {/* Add more images for the carousel */}
              <img
                src="https://creative-europe-desk.de/files/styles/slider_1400x735_exakt/public/images/vrdayseurope_immersive_tech.jpg"
                alt="Event Management 2"
                className="display-photo1"
              />
            </div>
            <div>
              {/* Add more images for the carousel */}
              <img
                src="https://theblackwomenintech.com/wp-content/uploads/2022/12/July-Events-Eventbrite-Title-Template-4.jpg"
                alt="Event Management 2"
                className="display-photo1"
              />
            </div>
            <div>
              {/* Add more images for the carousel */}
              <img
                src="https://eventbrowse.com/wp-content/uploads/2023/07/643489949a8e96bb996e787a_Tech20Week20Meta-JsVY83.tmp_.jpg"
                alt="Event Management 2"
                className="display-photo1"
              />
            </div>
            <div>
              {/* Add more images for the carousel */}
              <img
                src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F563913089%2F496415951365%2F1%2Foriginal.20230728-093246?h=230&w=460&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C241%2C1080%2C540&s=8de3ab39266095120b7ad8f334bd9eb3"
                alt="Event Management 2"
                className="display-photo1"
              />
            </div>
            <div>
              {/* Add more images for the carousel */}
              <img
                src="https://saeindia.org/jbframework/uploads/2023/03/Banner-2023-03-23T184459.521-1365x384.jpg"
                alt="Event Management 2"
                className="display-photo1"
              />
            </div>
            {/* Add more slides as needed */}
          </Slider>
          <br />
          <br />

          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerms} />

          {/* List of Events as Cards */}

          <div>
            <ul className="event-list-admin">

              {filteredEvents.map((event) => (

                <li key={event.id} className="event-item-admin">
                  {/* Event details */}
                  <Link to={`/events/${userid}/${event._id}`} style={{ textDecoration: 'none' }}>
                    <h5>{event.eventName}</h5>
                  </Link>
                  {/* <h5>{event.eventName}</h5> */}
                  <button
                    className="btn-delete"
                    onClick={() => deleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </li>

              ))}


            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
