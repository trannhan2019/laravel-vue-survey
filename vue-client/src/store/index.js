import { createStore } from "vuex";
import authService from "../services/authService";
import userService from "../services/userService";
import dashboardService from "../services/dashboardService";
import surveyService from "../services/surveyService";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },

    notification: {
      show: false,
      type: 'success',
      message: ''
    },

    dashboard:{
      loading:false,
      data:{}
    },

    surveys: {
      loading: false,
      links: [],
      data: []
    },

    currentSurvey: {
      data: {},
      loading: false,
    },

    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
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

    setDashboardLoading:(state,loading) =>{
      state.dashboard.loading = loading;
    },

    setDashboardData: (state, data) => {
      state.dashboard.data = data
    },

    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.links = surveys.meta.links;
      state.surveys.data = surveys.data;
    },

    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },

    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },

    notify: (state, {message, type}) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000)
    },
  },

  actions: {
    //auth
    register({ commit }, user) {
      return authService.register(user).then(({data}) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
      });
    },

    login({commit},user){
      return authService.login(user).then(({data})=>{
        commit('setUser', data.user);
        commit('setToken', data.token)
      })
    },

    logout({ commit }) {
      return authService.logout().then((response) => {
        commit("logout");
        return response;
      });
    },

    getUser({commit}){
      return userService.getUser()
        .then(({data}) =>{
          console.log(data);
          commit('setUser',data);
        })
    },
    //dashboard
    getDashboardData({commit}){
      commit("setDashboardLoading",true);
      return dashboardService.getDashboardData()
        .then(({data})=>{
          commit("setDashboardLoading",false);
          commit('setDashboardData', data);
        })
        .catch(err =>{
          commit("setDashboardLoading",false);
        })
    },
    //Surveys
    getSurveys({ commit }){
      commit('setSurveysLoading', true);
      return surveyService.getAll()
        .then(({data})=>{
          commit('setSurveysLoading', false)
          commit("setSurveys", data);
        })
    },
    getSurvey({ commit }, id){
      commit("setCurrentSurveyLoading", true);
      return surveyService.getOne(id)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    getSurveyBySlug({commit},slug){
      commit("setCurrentSurveyLoading", true);
      return surveyService.getSlug(slug)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurvey({commit},survey){
      delete survey.image_url;
      let response;

      if (survey.id){
        response = surveyService.update(survey)
          .then((res) => {
            commit('setCurrentSurvey', res.data)
            return res;
          });
      }else {
        response = surveyService.create(survey)
          .then(res =>{
            commit('setCurrentSurvey', res.data)
            return res;
          })
      }

      return response;
    },
    deleteSurvey({ dispatch }, id) {
      return surveyService.delete(id)
        .then((res) => {
        dispatch('getSurveys');
        return res;
      });
    },
    saveSurveyAnswer({commit}, {surveyId, answers}) {
      return surveyService.saveAnswer(surveyId,answers);
    },
  },
  modules: {},
});

export default store;
