import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    async login({ commit }, data) {
      await commit("setUser", data);
    },
    async logOut({ commit }) {
      commit("logout");
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    nickName: (state) => state.user.nombre,
    userToken: (state) => state.user.token,
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
