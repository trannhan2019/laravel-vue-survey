import axiosClient from "./axiosClient";

const userService = {
  getUser(){
    const url = "/user";
    return axiosClient.get(url);
  }
};

export default userService;
