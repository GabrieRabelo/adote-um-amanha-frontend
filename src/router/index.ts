import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../modules/shared/views/Login.vue";
import Necessity from "../modules/institution/views/Necessity.vue";
import Instituition from "../modules/institution/views/Instituition.vue";
import SplashScreen from "../modules/shared/views/SplashScreen.vue";
import EditNecessity from "../modules/institution/views/EditNecessity.vue";
import { isAuthenticated } from "@/modules/shared/utils/AuthenticationManager";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: SplashScreen,
  },
  {
    path: "/auth",
    name: "Login",
    component: Login,
  },
  {
    path: "/necessity/:id",
    name: "Institution necessity",
    component: Necessity,
  },

  {
    path: "/institution/:id",
    name: "Instituition instituition",
    component: Instituition,
  },
  {
    path: "/necessity/:id/edit",
    name: "",
    component: EditNecessity,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = !isAuthenticated();
  if (auth && to.name !== "Login") {
    next({ name: "Login" });
  }
  next();
});

export default router;
