import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../modules/shared/views/Login.vue";
import Necessity from "../modules/institution/views/Necessity.vue";
import Instituition from "../modules/institution/views/Instituition.vue";
import SplashScreen from "../modules/shared/views/SplashScreen.vue";
import EditNecessity from "../modules/institution/views/EditNecessity.vue";
import RegisterRequest from "../modules/shared/views/RegisterRequest.vue";
import Home from "../modules/shared/views/Home.vue";
import Necessities from "../modules/shared/views/Necessities.vue";
import { isAuthenticated } from "@/modules/shared/utils/AuthenticationManager";
import Donation from "../modules/donator/views/Donation.vue";
import EditDonation from "../modules/shared/views/EditDonation.vue";

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
    path: "/home/",
    name: "Home",
    component: Home,
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
  {
    path: "/necessities/create",
    name: "",
    component: RegisterRequest,
  },
  {
    path: "/necessities",
    name: "List necessities",
    component: Necessities,
  },
  {
    path: "/donations/:id",
    name: "Donation",
    component: Donation,
  },
  {
    path: "/donations/:id/edit",
    name: "Edit Donation",
    component: EditDonation,
  },
  {
    path: "/donations/create",
    name: "",
    component: RegisterRequest,
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
