import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Forecast from "./views/Forecast";
import AddLocation from "./views/AddLocation";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/forecast",
      name: "forecast",
      component: Forecast,
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.report) {
          return next("/");
        }
        next();
      }
    },
    {
      path: "/add",
      name: "addLocation",
      component: AddLocation
    }
  ]
});
