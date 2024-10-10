import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const EVENTS_API = `${BASE_API}/api/events`;
export const USERS_API = `${BASE_API}/api/users`;
export const USEREVENTS_API = `${BASE_API}/api/userevents`;

export const findAllEvents = async () => {
  const response = await axios.get(`${EVENTS_API}`);
  return response.data;
};

export const findEventById = async (eventId) => {
  const response = await axios.get(`${EVENTS_API}/${eventId}`);
  return response.data;
};
  
export const findUserById = async (userId) => {
    const response = await axios.get(`${USEREVENTS_API}/${userId}`);
    return response.data;
};

export const fetchAllEvents = async (eventId) => {
  const response = await axios.get(`${EVENTS_API}/${eventId}`);
  return response.data;
}

export const fetchCurrentUserDetails = async (userid) => {

  const response = await axios.post(`${USERS_API}/currentUser`, { userid: userid });
  return response.data;
};


export const isUserRegisteredForEvent = async (userId, eventId) => {
  try {
    const response = await axios.get(`${USEREVENTS_API}/${userId}/${eventId}/isregistered`);
    return response.data.isRegistered;
  } catch (error) {
    console.error("Error checking user registration for event:", error);
    throw error;
  }
};

export const registerUserForEvent = async (userId, eventId) => {
  const response = await axios.post(`${USEREVENTS_API}/${userId}/${eventId}/register`);
  return response.data.isRegistered;
}

export const deRegisterUserForEvent = async (userId, eventId) => {
  const response = await axios.put(`${USEREVENTS_API}/${userId}/${eventId}/deregister`);
  return response.data.isDeregistered
}

export const registrationStatus =  async (userId, eventId) => {
  const response = await axios.get(`${USEREVENTS_API}/${userId}/${eventId}/registerstatus`);
  return response.data;
};

export const bookmarkedStatus =  async (userId, eventId) => {
  const response = await axios.get(`${USEREVENTS_API}/${userId}/${eventId}/bookmarkstatus`);
  return response.data;
};

export const bookmarkEvent = async (userId, eventId) => {
  const response = await axios.post(`${USEREVENTS_API}/${userId}/${eventId}/bookmark`);
  return response.data;
}

export const deBookmarkEvent = async (userId, eventId) => {
  const response = await axios.put(`${USEREVENTS_API}/${userId}/${eventId}/debookmark`);
  return response.data;
}

export const saveUserRating = async (userId, eventId, rating) => {
  console.log("In client.js", rating);
  const response = await axios.put(`${USEREVENTS_API}/${userId}/${eventId}/ratings`, {rating:rating});
  return response.data;
}

export const getUserrating = async(userId,eventId) => {
  const response = await axios.get(`${USEREVENTS_API}/${userId}/${eventId}/getrating`);
  return response.data;
}

export const getOverallRating = async (userId,eventId) => {
  const response = await axios.get(`${USEREVENTS_API}/${userId}/${eventId}/overallrating`);
  return response.data;
}

export const getOrganizerDetails = async (eventId) => {
  try {
    // Fetch event details to get the organizerId
    const eventDetails = await findEventById(eventId);
    const organizerId = eventDetails.organizerId;
    // Fetch user details using the organizerId
    const organizerDetails = await findUserById(organizerId);
console.log(organizerDetails,"orgdetails");
    return organizerDetails;
  } catch (error) {
    console.error('Error getting organizer details:', error);
    throw error;
  }
};