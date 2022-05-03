import axiosClient from "./axiosClient";

const dashboardService = {
  getDashboardData(){
    const url = "/dashboard";
    return axiosClient.get(url);
  }
}

export default dashboardService;
