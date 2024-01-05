import Cookies from "js-cookie";
import { createStore } from "vuex";
import { supabase } from "../includes/supabase";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      showAuthModal: false,
      /* The `showLogoutModal` variable is used to control the visibility of the logout modal. It is
      initially set to `false`, indicating that the logout modal is not shown. When the
      `toggleLogoutModal` mutation is called, it toggles the value of `showLogoutModal`, causing the
      logout modal to be shown or hidden depending on its current state. */
      showLogoutModal: false,
      userLoggedIn: false,
      userData: { user: null, session: null }
    };
  },
  mutations: {
    toggleAuthModal(state) {
      //   console.log("Toggling modal", state);
      state.showAuthModal = !state.showAuthModal;
    },
    toggleUserLoggedIn(state) {
      //   console.log("Toggling modal", state);
      state.userLoggedIn = !state.userLoggedIn;
    },
    toggleLogoutModal(state) {
      //   console.log("Toggling modal", state);
      state.showLogoutModal = !state.showLogoutModal;
    },
    setUserData(state, data) {
      console.log(state, data);
      state.userData = { ...data };
      // state.userData.user = { ...data.user };
      // state.userData.session = { ...data.session };
      console.log(state);
    }
  },
  getters: {
    getShowAuthModal: (state) => {
      return state.showAuthModal;
    },
    getUserData: (state) => {
      return state.userData;
    }
  },
  actions: {
    async register({ commit }, payload) {
      await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            displayName: payload.name,
            age: payload.age,
            country: payload.country
          }
        }
      });
      commit("toggleAuthModal");
    },
    async login({ commit }, payload) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password
      });

      commit("toggleUserLoggedIn");
      commit("toggleAuthModal");
      console.log(data);
      // commit("setUserData", data);
    },
    async logout({ commit }) {
      const res = await supabase.auth.signOut();
      console.log(res);
      commit("toggleUserLoggedIn");
      commit("toggleLogoutModal");
    }
  }
});
