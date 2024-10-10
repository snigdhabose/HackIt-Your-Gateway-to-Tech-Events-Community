import React, { useState, useEffect } from "react";
import * as client from "./client";
import "./StarRating.css";
import { useNavigate } from "react-router";

function StarRating({ eventId , userid, account }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate();

  const fetchEventRating = async () => {
    try {
      const averageRating = await client.getOverallRating(userid,eventId);
      const roundedAverageRating = averageRating.toFixed(2);
      setAverageRating(roundedAverageRating);
    } catch (error) {
      console.error("Error fetching event rating:", error);
    }
  };

  const getUserRating = async () => {
    const value = await client.getUserrating(userid,eventId);
    setRating(value);
  }


  const saveUserRating = async (index) => {
    if(!userid){
      navigate("/signin/user");
    }
    else{
    setRating(index);
    const ratingResponse = await client.saveUserRating(userid, eventId, index);
    setRating(ratingResponse);
    fetchEventRating();
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if(userid){
      await fetchEventRating();
      await getUserRating();
      }
    };

    fetchData();
  }, [userid, eventId]);

  return (
    <div className="star-rating">
      <h5>Ratings: {averageRating}</h5>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => saveUserRating(index)} //setRating(index)
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            disabled={account?.role === "organizer"||account?.role === "admin"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;