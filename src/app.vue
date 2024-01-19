<script>
import AppHeader from './components/app-header.vue';
import LogoutModal from './components/auth/logout-form.vue';
import AuthModal from './components/auth/auth-modal.vue';
import { mapMutations } from 'vuex';

export default {
  name: "App",
  components: {
    AppHeader,
    AuthModal,
    LogoutModal
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        await this.$store.dispatch('getUser');
        // Do something after fetching the user if needed
      } catch (error) {
        console.error("Error in fetchUser:", error.message);
      }
    },
  },
}
</script>

<template>
  <div class="">
    <app-header />
    <router-view></router-view>
    <auth-modal />
    <logout-modal />
  </div>
</template>
