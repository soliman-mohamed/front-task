import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    user: null
  },
  getters: {
    isLogged: state => !!state.user,
    user(state) {
      return state.user;
    }
  },
  mutations: {
    setUserData (state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },

    clearUserData () {
      localStorage.removeItem('user');
      if (location.pathname !== '/login'){
          window.location.href = '/login';
      }
    }
  },
  actions: {
    login({ commit }, credentials) {
      return commit('setUserData', credentials);
    },
    logout ({ commit }) {
      commit('clearUserData')
    }
  },
  modules: {
  }
})
