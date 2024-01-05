<script setup >
import AppHeader from './components/app-header.vue'
import AuthModal from './components/auth/auth-modal.vue';
import LogoutModal from './components/auth/logout-form.vue';
</script>
<!-- <script >
import AppHeader from './components/app-header.vue'
import AppIntro from './components/app-intro.vue';
export default {
  name: "App",
  components: {
    AppHeader,
    AppIntro
  }
}
</script> -->

<template>
  <div class="">
    <app-header />
    <router-view>
    </router-view>
    <auth-modal />
    <logout-modal />
  </div>
</template>
