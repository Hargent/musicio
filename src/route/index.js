// 1. Define route components.

import { createRouter, createWebHistory } from "vue-router";

import AppAbout from "../views/app-about.vue";
import AppHome from "../views/app-home.vue";
import AppManage from "../views/app-manage.vue";
import PageNotFound from "../views/page-not-found.vue";

const routes = [
  { name: "home", path: "/", component: AppHome },
  { name: "about", path: "/about", component: AppAbout },
  {
    name: "manage",
    path: "/manage",
    alias: "/manage-music",
    component: AppManage
  },
  { name: "404", path: "/:catchAll(.*)*", component: PageNotFound }
];

export const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "text-yellow-500"
});
