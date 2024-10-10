import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import "./Dashboard.css"; // Import the styles


const EditEventFormPopup = ({onCancel, event }) => {
  console.log("event *****", event);
  const navigate = useNavigate();
  const [eventToEdit, setEventToEdit] = useState(event);
  // setEventToEdit(event);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventToEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleCreateEvent = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await client.createEvent(eventData);
  //     setSuccessMessage("Event created successfully!");
  //     setErrorMessage(""); // Clear any previous error message
  //     // Close the form after a brief delay
  //     setTimeout(() => {
  //       setSuccessMessage(""); // Clear the success message
  //       // onCreateEvent(); // Notify the parent component that an event has been created
  //       onCancel(); // Close the form
  //     }, 1000); // Adjust the delay time as needed
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //     setErrorMessage("Error creating event. Please try again.");
  //     setSuccessMessage(""); // Clear any previous success message
  //   }
  // };

  const handleUpdateEvent = async (e) => {
    console.log("updated form");
    e.preventDefault();
    try {

      const updatedEvent = await client.updateEventDetails(eventToEdit._id, eventToEdit);
      console.log("Event updated:", updatedEvent);

      setSuccessMessage("Event updated successfully!");
      setErrorMessage("");

      // Close the form after a brief delay
      setTimeout(() => {
        setSuccessMessage("");
        onCancel(); // Close the form
      }, 600); // Adjust the delay time as needed

      console.log("Form submitted and event updated successfully!");
    } catch (error) {
      console.error("Error updating event details:", error);
      setErrorMessage("Error updating event. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleCancel = () => {
    onCancel();
    // navigate(`/${eventToEdit.organizerId}/myEvents`); // Navigate back to the dashboard
    navigate(`/${eventToEdit.organizerId}`);
  };

  // const fetchEventDetails = async (eventId) => {

  //   const eventToEdit = await client.findEventById(eventId);
  //   console.log("eventToEdit ", eventToEdit);
  //   setEventToEdit(eventToEdit);
  // };

  // useEffect(() => {
  //   fetchEventDetails(eventId);
  // }, [eventId]);

  return (
    <div className="popup-overlay">
      <div className="create-event-form-popup">
        <h2 style={{ color: "white" }}>Edit Event</h2>

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

        {eventToEdit && (
          <form onSubmit={handleUpdateEvent}>
            {/* Add input fields for event data */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Event Name"
                className="form-control"
                id="eventName"
                name="eventName"
                onChange={handleInputChange}
                value={eventToEdit.eventName}
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
                value={eventToEdit.summary}
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
                value={eventToEdit.description}
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
                value={new Date(eventToEdit.date).toISOString().split('T')[0] || ''} 
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
                value={eventToEdit.timeStart}
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
                value={eventToEdit.timeEnd}
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
                value={eventToEdit.duration}
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
                value={eventToEdit.venue}
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
                value={eventToEdit.photo}
                required
              />
            </div>

            <div className="button-container">
              <button type="submit"
                className="btn btn-danger btn-rounded"
              >
                Save
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

       )}

      </div>
    </div>
  );
};

export default EditEventFormPopup;
