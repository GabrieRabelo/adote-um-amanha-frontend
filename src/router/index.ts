import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../modules/shared/views/Login.vue";
import Necessity from "../modules/institution/views/Necessity.vue";
import Institution from "../modules/institution/views/Institution.vue";
import SplashScreen from "../modules/shared/views/SplashScreen.vue";
import EditNecessity from "../modules/institution/views/EditNecessity.vue";
import NecessityDescription from "../modules/donator/views/NecessityDescription.vue";
import NecessityDescriptionAdmin from "../modules/admin/views/NecessityDescription.vue";
import RegisterRequest from "../modules/shared/views/RegisterRequest.vue";
import Home from "../modules/shared/views/Home.vue";
import Necessities from "../modules/shared/views/Necessities.vue";
import { isAuthenticated } from "@/modules/shared/utils/AuthenticationManager";
import RegisterDonator from "../modules/donator/views/RegisterDonator.vue";
import Donation from "../modules/donator/views/Donation.vue";
import EditDonation from "../modules/shared/views/EditDonation.vue";
import Donations from "../modules/donator/views/Donations.vue";
import Matches from "../modules/admin/views/matches/Matches.vue";
import CreateMatch from "../modules/shared/views/CreateMatch.vue";
import MatchDescription from "../modules/admin/views/MatchDescription.vue";
import RegisterInstitution from "../modules/admin/views/RegisterInstitution.vue";

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
    name: "Institution institution",
    component: Institution,
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
    path: "/admin/necessities",
    name: "List necessities",
    component: Necessities,
  },
  {
    path: "/necessityDescription/:id",
    name: "Donator necessity description",
    component: NecessityDescription,
  },
  {
    path: "/admin/necessities/:id",
    name: "Administrator necessity description",
    component: NecessityDescriptionAdmin,
  },
  {
    path: "/donations/:id",
    name: "Donation",
    component: Donation,
  },
  {
    path: "/donations",
    name: "Donations",
    component: Donations,
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
  {
    path: "/donator/create",
    name: "Register",
    component: RegisterDonator,
  },
  {
    path: "/admin/matches",
    name: "Matches",
    component: Matches,
  },
  {
    path: "/admin/donations/:id",
    name: "Donation For Admin",
    component: Donation,
  },
  {
    path: "/admin/donations",
    name: "List donations",
    component: Donations,
  },
  {
    path: "/admin/create-match",
    name: "Create Match",
    component: CreateMatch,
    props: true,
  },
  {
    path: "/admin/matches/:id",
    name: "Admin Match Description",
    component: MatchDescription,
  },
  {
    path: "/admin/institution/create",
    name: "Register Institution",
    component: RegisterInstitution,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = isAuthenticated();
  if (!auth && to.name !== "Login" && to.name !== "Register") {
    next({ name: "Login" });
  }
  next();
});

export default router;
