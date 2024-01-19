import * as tus from "tus-js-client";

import Cookies from "js-cookie";
import { createStore } from "vuex";
import { replaceNonAlphabeticWithUnderscore } from "../utils";
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
      userData: { user: null, session: null },
      uploads: []
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
      // console.log(state);
    },
    addUploadFile(state, fileName) {
      const fileFound = state.uploads.find((file) => file.name === fileName);

      if (fileFound) {
        fileFound.status = "re-uploading";
        return;
      }
      state.uploads.push({
        name: fileName,
        progress: "0%",
        status: "uploading"
      });
      // console.log(state.uploads);
    },
    updateUploadFileProgress(state, { fileName, progress, status }) {
      const fileFound = state.uploads.find((file) => file.name === fileName);
      if (fileFound) {
        fileFound.progress = progress;
        fileFound.status = status || fileFound.status;
      }
    }
  },
  getters: {
    getShowAuthModal: (state) => {
      return state.showAuthModal;
    },
    getUserData: (state) => {
      return state.userData;
    },
    getUploads: (state) => {
      return state.uploads;
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
    async getUser({ commit }) {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!error) {
          commit("toggleUserLoggedIn");
          console.log(data, " : is the current user");
        } else {
          console.error("Error fetching user:", error);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    },
    async logout({ commit }) {
      const res = await supabase.auth.signOut();
      console.log(res);
      commit("toggleUserLoggedIn");
      commit("toggleLogoutModal");
    },
    // async uploadFiles({ commit }, payload) {
    //   const {
    //     data: { session }
    //   } = await supabase.auth.getSession();
    //   console.log(payload, session);
    //   if (!session.access_token) {
    //     return Promise.reject("No access token");
    //   }

    //   const uploadPromises = payload.files.map((file) => {
    //     return new Promise((resolve, reject) => {
    //       const upload = new tus.Upload(file, {
    //         endpoint: `${
    //           import.meta.env.VITE_API_URL
    //         }/storage/v1/object/musics/${file.name}`,
    //         retryDelays: [0, 3000, 5000, 10000, 20000],
    //         headers: {
    //           authorization: `Bearer ${session.access_token}`,
    //           "x-upsert": "true"
    //         },
    //         uploadDataDuringCreation: true,
    //         removeFingerprintOnSuccess: true,
    //         metadata: {
    //           bucketName: payload.bucketName,
    //           objectName: file.name,
    //           cacheControl: 3600,
    //           filename: file.name,
    //           filetype: file.type
    //         },
    //         chunkSize: 6 * 1024 * 1024,
    //         onError: function (error) {
    //           console.log("Failed because: " + error);
    //           reject(error);
    //         },
    //         onProgress: function (bytesUploaded, bytesTotal) {
    //           var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    //           console.log(bytesUploaded, bytesTotal, percentage + "%");
    //           commit("updateUploadFileProgress", {
    //             fileName: file.name,
    //             progress: `${percentage}%`
    //           });
    //         },

    //         onSuccess: function () {
    //           console.log("Download %s from %s", upload.file.name, upload.url);
    //           resolve();
    //         }
    //       });

    //       upload.findPreviousUploads().then(function (previousUploads) {
    //         if (previousUploads.length) {
    //           upload.resumeFromPreviousUpload(previousUploads[0]);
    //         }
    //         upload.start();
    //       });
    //     });
    //   });

    //   return Promise.all(uploadPromises);
    // }

    async uploadFile({ commit }, payload) {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      console.log(payload, session);
      if (session.access_token) {
        commit("addUploadFile", payload.file.name);
      }

      return new Promise((resolve, reject) => {
        var upload = new tus.Upload(payload.file, {
          // endpoint:
          //   "https://supabase.com/dashboard/project/duwkqwelgzttpohclcgu/storage/buckets/musics",
          endpoint: `${import.meta.env.VITE_API_URL}/storage/v1/object/musics/${
            payload.file.name
          }`,
          retryDelays: [0, 3000, 5000, 10000, 20000],
          headers: {
            authorization: `Bearer ${session.access_token}`,
            "x-upsert": "true" // optionally set upsert to true to overwrite existing files
          },
          uploadDataDuringCreation: true,
          removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
          metadata: {
            bucketName: payload.bucketName,
            objectName: payload.file.name,
            // contentType: "image/png",
            cacheControl: 3600,
            filename: payload.file.name,
            filetype: payload.file.type
          },
          chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
          onError: function (error) {
            console.log("Failed because: " + error);
            reject(error);
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + "%");
            commit("updateUploadFileProgress", {
              fileName: payload.file.name,
              progress: `${percentage}%`
              // status: "uploading"
            });
          },
          onSuccess: function () {
            console.log("Download %s from %s", upload.file.name, upload.url);
            resolve();
          },
          onChunkComplete: function () {
            console.log("chunk done");
          },
          onAfterResponse: function () {
            console.log("after response");
            commit("updateUploadFileProgress", {
              fileName: payload.file.name,
              progress: `${100}%`,
              status: "successful"
            });
            resolve();
            return; //create node backend
          },
          onBeforeRequest: function () {
            console.log("before request");
          },
          onUploadUrlAvailable: function () {
            console.log("url available");
          },
          onShouldRetry: () => {
            console.log("retry");
          }
        });
        // upload.start();
        // Check if there are any previous uploads to continue.
        return upload
          .findPreviousUploads()
          .then(function (previousUploads) {
            // Found previous uploads so we select the first one.
            if (previousUploads.length) {
              upload.resumeFromPreviousUpload(previousUploads[0]);
            }

            // Start the upload
            upload.start();
          })
          .catch(reject);
      });
    }
  }
});
