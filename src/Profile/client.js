import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
const request = axios.create({
  withCredentials: true,
});

export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  console.log("RESPP", response.data)
  return response.data;
};

export const fetchCurrentUserDetails = async (userid) => {
  const response = await request.post(`${USERS_API}/currentUser`, { userid: userid });
  console.log("response", response.data);
  return response.data;
};

export const updateUser = async (user) => {
  // console.log("update user", user);
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const fetchAllRegisteredEvents = async (userid) => {
    console.log("fetch events userid: ", userid);
    const response = await request.get(`${USERS_API}/fetchAllRegisteredEvents/${userid}`);
    return response.data;
}

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${USERS_API}/${userId}/deleteUser`);
  return response.data;
};

// /api/events/organizer/:organizerId
export const fetchAllOrganizerEvents = async (userid) => {
    console.log("fetch events userid: ", userid);
    const response = await request.get(`${BASE_API}/api/events/organizer/${userid}`);
    return response.data;
}
