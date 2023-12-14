// 1. Define route components.

import { createRouter, createWebHashHistory } from "vue-router";

// These can be imported from other files
const Home = { template: "<div>Home</div>" };
const About = { template: "<div>About</div>" };

const routes = [
  //   { path: "/", component: Home },
  //   { path: "/about", component: About }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});
