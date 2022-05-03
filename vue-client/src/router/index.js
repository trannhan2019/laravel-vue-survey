import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import store from "../store";
import AuthLayout from "../layouts/AuthLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "/surveys",
          name: "Surveys",
          component: () => import("../views/Surveys.vue"),
        },
        { path: "/surveys/create", name: "SurveyCreate", component:() => import("../views/SurveyView.vue"), },
        { path: "/surveys/:id", name: "SurveyView", component: () => import("../views/SurveyView.vue"), },
      ],
    },
    {
      path: "/auth",
      redirect: "/login",
      name: "Auth",
      component: AuthLayout,
      meta: { isGuest: true },
      children: [
        {
          path: "/login",
          name: "Login",
          component: () => import("../views/Login.vue"),
        },
        {
          path: "/register",
          name: "Register",
          component: () => import("../views/Register.vue"),
        },
      ],
    },
    {
      path: "/404",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
