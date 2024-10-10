import React, { useState } from "react";
import EditEventFormPopup from "./EditEventFormPopup";
import * as client from "./client";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const EventCard = ({ event, userid, openPopup, isOrganizer }) => {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchCurrentUserDetails = async (userid) => {
    try {
      const account = await client.fetchCurrentUserDetails(userid);
      setAccount(account);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }

  };

  // const editEventPage = () => {
  //   navigate(`/events/${userid}/${event._id}/editEvent`);
  // };

  // const editEventDetails = async () => {
  //   try {
  //     const event = await client.editEventDetails();
  //     console.log(event);
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }

  // };


  useEffect(() => {
    const findUserById = async (userid) => {
      try {
        const user = await client.findUserById(userid);
        setAccount(user);
        console.log("Fetched user:", user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchCurrentUserDetails(userid);
    // findUserById(userid);
  }, [userid]);

  const deleteEvent = async () => {
    await client.deleteEvent(event._id);

  };

  return (
    <div key={event.id} className="event-card" style={{ margin: "10px" }}>
      <Link
        key={event._id}
        to={
          userid
            ? `/events/${userid}/${event._id}`
            : `/events/${event._id}`
        }
        style={{ textDecoration: "none" }}
      >

        <img src={event.photo} alt={event.eventName} />
        <div>
          <h2>{event.eventName}</h2>
          <p>{event.summary}</p>
          <p>Duration: {event.duration}</p>
          <p>{event.venue}</p>
        </div>
      </Link>
      {isOrganizer && (
        <div>
          <button className="btn btn-primary" onClick={() => openPopup(event)}> Edit </button>
          {/* <button className="btn btn-primary" onClick={<EditEventFormPopup event = {event}/>}> EditTest </button> */}
          <button className="btn btn-primary" onClick={deleteEvent} > Delete </button>
        </div>


      )}
      {/* {account && account.role === 'organizer' && (
        
      )} */}
      {/* {isPopupOpen && (
        console.log("before pop up ", event),
        <EditEventFormPopup
          // onCancel={closePopup}
          // onSave={editEventDetails}
          event= {event}
        />
      )} */}

    </div>
  );
};

export default EventCard;
