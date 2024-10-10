import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
const request = axios.create({
  withCredentials: true,
});



export const fetchCurrentUserDetails = async (userid) => {
  const response = await request.post(`${USERS_API}/currentUser`, { userid: userid });
  return response.data;
};



export const findUserById = async (userId) => {
  console.log("XXX",userId)
  const response = await axios.get(`${USERS_API}/${userId}`);
  return response.data;
};
export const fetchAllRegisteredEvents = async (userid) => {
  console.log("fetch events userid: ", userid);
  const response = await request.get(`${USERS_API}/fetchAllRegisteredEvents/${userid}`);
  return response.data;
}
