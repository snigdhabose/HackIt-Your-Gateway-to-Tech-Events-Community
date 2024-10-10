// OrganizerCard.js

import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CreateEventFormPopup from "./CreateEventFormPopup";

const OrganizerCard = ({ isAddCard, onCreateEvent }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  if (isAddCard) {
    return (
      <div>
        <div className="event-card add-card" onClick={openPopup}>
          <span className="add-icon bigger-icon">
            <FiPlus />
          </span>
        </div>

        {isPopupOpen && (
          <CreateEventFormPopup
            onCancel={closePopup}
            onCreateEvent={onCreateEvent}
          />
        )}
      </div>
    );
  }
};

export default OrganizerCard;
