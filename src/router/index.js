import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../components/IMM")
  },
  {
    path: "/imm",
    component: () => import("../components/IMM")
  },
  {
    path: "/data",
    component: () => import("../components/LocalStore")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
