import { createStore } from "vuex";

// Create a new store instance.
export const store = createStore({
  state() {
    return {
      showAuthModal: false,
      userData: { user: null, session: null }
    };
  },
  mutations: {
    toggleAuthModal(state) {
      //   console.log("Toggling modal", state);
      state.showAuthModal = !state.showAuthModal;
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
  }
});
