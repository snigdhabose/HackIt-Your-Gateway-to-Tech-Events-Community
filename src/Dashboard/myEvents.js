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
import EditEventFormPopup from "./EditEventFormPopup";
const MyEvents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const [filteredEvents, setFilteredEvents] = useState([]);
  // const [event, setEvent] = useState([]);
  const userid = useParams().id;
  // console.log("id", userid);
  const id1 = useParams().id;
  // console.log("id1", id1);

  const findAllEvents = async (userid) => {
    const events = await client.findEventsByOrganizerId(userid);  //giving UNDEFINED
    //const events = await client.findAllEvents();
    console.log("response", events);

    setEvents(events);
    setFilteredEvents(events);
    console.log("filteredEvents", filteredEvents);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openPopup = (event) => {
    setSelectedEvent(event);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setPopupOpen(false);
  };

  useEffect(() => {
    findAllEvents(userid);
  }, [userid]);

  // const carouselSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   arrows: false,
  //   autoplaySpeed: 3000,
  // };

  // const [isPopupOpen, setPopupOpen] = useState(false);
  // const openPopup = () => {
  //   setPopupOpen(true);
  // };

  // const closePopup = () => {
  //   setPopupOpen(false);
  // };

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


          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerms} />

          {/* List of Events as Cards */}
          <div className="event-list">
            <div className="event-cards">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} userid={userid} openPopup={openPopup} isOrganizer={true}/>
              ))}
              <OrganizerCard isAddCard={true} />
            </div>


          </div>

          {isPopupOpen && (
            <EditEventFormPopup onCancel={closePopup} event={selectedEvent} />
          )}


        </div>
      </div>
    </div>
  );
};

export default MyEvents;
