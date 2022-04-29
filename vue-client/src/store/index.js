import { createStore } from "vuex";
import authService from "../services/authService";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  },
  getters: {},

  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, user) => {
      state.user.data = user;
    },

    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
  },

  actions: {
    register({ commit }, user) {
      return authService.register(user).then((res) => {
        commit("setUser", res.data.user);
        commit("setToken", res.data.token);
        return res.data;
      });
    },

    logout({ commit }) {
      return authService.logout().then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  modules: {},
});

export default store;
