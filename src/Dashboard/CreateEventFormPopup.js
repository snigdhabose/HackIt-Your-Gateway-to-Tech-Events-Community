// CreateEventFormPopup.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./Dashboard.css"; // Import the styles
import { useParams } from "react-router-dom";
const CreateEventFormPopup = ({ onCancel, onCreateEvent }) => {
  const userid = useParams().id;
  console.log("hahahahahahaah", userid);
 
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({ organizerId: userid
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await client.createEvent(eventData);
      setSuccessMessage("Event created successfully!");
      setErrorMessage(""); // Clear any previous error message
      
      // Close the form after a brief delay
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message
        // onCreateEvent(); // Notify the parent component that an event has been created
        onCancel(); // Close the form
        navigate(`/${userid}`);
      }, 600); // Adjust the delay time as needed
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorMessage("Error creating event. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  const handleCancel = () => {
    onCancel();
    // navigate(`/${eventData.organizerId}/myEvents`); // Navigate back to the dashboard
    navigate(`/${eventData.organizerId}`);
  };

  return (
    <div className="popup-overlay">
      <div className="create-event-form-popup">
        <h2 style={{ color: "white" }}>Create Event</h2>

        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleCreateEvent}>
          {/* Add input fields for event data */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Event Name"
              className="form-control"
              id="eventName"
              name="eventName"
              onChange={handleInputChange}
              value={eventData.eventName}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Event Summary"
              className="form-control"
              id="summary"
              name="summary"
              onChange={handleInputChange}
              value={eventData.summary}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Event Description"
              className="form-control"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={eventData.description}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Event Date"
              name="date"
              onChange={handleInputChange}
              value={eventData.date}
              required
            />
          </div>

          <div className="mb-3">
              <input
                type="time"
                placeholder="Event start time"
                className="form-control"
                id="timeStart"
                name="timeStart"
                onChange={handleInputChange}
                value={eventData.timeStart} 
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="time"
                placeholder="Event end time"
                className="form-control"
                id="timeEnd"
                name="timeEnd"
                onChange={handleInputChange}
                value={eventData.timeEnd}
                required
              />
            </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Event Duration"
              className="form-control"
              id="duration"
              name="duration"
              onChange={handleInputChange}
              value={eventData.duration}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Event Venue"
              className="form-control"
              id="venue"
              name="venue"
              onChange={handleInputChange}
              value={eventData.venue}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Photo URL"
              className="form-control"
              id="photo"
              name="photo"
              onChange={handleInputChange}
              value={eventData.photo}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="btn btn-danger btn-rounded">
              Create Event
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventFormPopup;
