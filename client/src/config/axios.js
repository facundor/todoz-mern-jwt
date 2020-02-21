import axios from "axios";
import tokenAuth from "./token";
import JWTDecode from "jwt-decode";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const renewToken = async () => {
  try {
    const response = await axiosClient.get("/api/auth");
    tokenAuth(response.data.token);
  } catch (error) {
    console.log(error);
  }
};

const reqInterceptor = axiosClient.interceptors.request.use(function(config) {
  // Token renew
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = JWTDecode(token);
    // https://stackoverflow.com/a/45515761/948938
    if (Math.floor(Date.now() / 1000) > decoded.softexp) {
      // https://stackoverflow.com/a/53294310/948938
      axiosClient.interceptors.request.eject(reqInterceptor);
      renewToken();
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Token invalid
    if (error.response && 401 === error.response.status) {
      tokenAuth(null);
      window.location = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosClient;
