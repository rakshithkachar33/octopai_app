import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login/", {
    username,
    password,
  });
};

const logout = () => {
  return axios.post(API_URL + "logout/");
};

const changePassword = async (email, oldPassword, newPassword, confirmPassword) => {
  const response = await axios.post(API_URL + "change-password/", {
    email:email,
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });
  return response;
};
const savePosition = async (username, position) => {
  try {
    const response = await axios.post(API_URL + "save-position/", {
    username,
    position
  });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const sendOtp = (email) => {
  return axios.post(API_URL + "forget-password/", {
    email,
  });
};

const authService = {
  register,
  login,
  logout,
  changePassword,
  sendOtp,
  savePosition,
};

export default authService;
