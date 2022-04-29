import axiosClient from "./axiosClient";

const authService = {
  register(user) {
    const url = "/register";
    return axiosClient.post(url, user);
  },

  login(user) {
    const url = "/login";
    return axiosClient.post(url, user);
  },

  logout() {
    const url = "/logout";
    return axiosClient.post(url);
  },
};

export default authService;
