import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const USERS_API = `${BASE_API}/api/users`;
const request =  axios.create({
  withCredentials: true,
});
 
export const signin = async (credentials) => {
  console.log("sign in creds,",credentials)
  const response = await request.post( `${USERS_API}/signin/user`, credentials );
  return response.data;
};
export const signinOrganizer = async (credentials) => {
  console.log("sign in creds,",credentials)
  const response = await request.post( `${USERS_API}/signin/organizer`, credentials );
  return response.data;
};
export const signinAdmin = async (credentials) => {
  console.log("sign in creds,",credentials)
  const response = await request.post( `${USERS_API}/admin`, credentials );
  return response.data;
};
export const createUser = async (user) => {
    const response = await axios.post(`${USERS_API}`, user);
    return response.data;
  };
  
  export const findAllUsers = async () => {
    const response = await axios.get(`${USERS_API}`);
    console.log("RESPP",response.data)
    return response.data;
  };
  export const signup = async (credentials) => {
    console.log("Signup",credentials)
    //const newUser = { ...credentials,
        // _id: new Date().getTime().toString() };
    const response = await request.post(
      `${USERS_API}/signup`, credentials);
      
    return response.data;
  };
 
  export const updateUser = async (user) => {
    console.log("update user", user);
    const response = await request.put(`${USERS_API}/${user.id}`, user);
    return response.data;
  };