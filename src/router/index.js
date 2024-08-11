import { createRouter, createWebHistory } from "vue-router";
import Admin from "../pages/Admin.vue";

import { authStore } from "../stores/auth/authStore";

const checkAuth = async (to, from, next) => {
  const useAuth = authStore();
  await useAuth.checkLogin();
  if (useAuth.hasLogin == true && to.path == "/login") {
    next({ path: "/dashboard" });
  } else if (useAuth.hasLogin == false && to.path != "/login") {
    next({ path: "/login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../pages/dashboard/Dashboard.vue"),
      },
      {
        path: "company",
        name: "CompanyList",
        component: () => import("../pages/master/company/CompanyList.vue"),
        meta: { requiresAdmin: "true" },
      },
      {
        path: "user",
        name: "UserList",
        component: () => import("../pages/master/user/UserList.vue"),
        meta: { requiresAdmin: "true" },
      },
      {
        path: "device-type",
        name: "DeviceTypeList",
        component: () =>
          import("../pages/master/device-type/DeviceTypeList.vue"),
        meta: { requiresAdmin: "true" },
      },
      {
        path: "device",
        name: "DeviceList",
        component: () => import("../pages/master/device/DeviceList.vue"),
      },
      {
        path: "device-add",
        name: "DeviceAdd",
        component: () => import("../pages/master/device/DeviceAdd.vue"),
      },
      {
        path: "device-edit/:device",
        name: "DeviceEdit",
        component: () => import("../pages/master/device/DeviceEdit.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("../pages/information/profile/Profile.vue"),
      },
    ],
    beforeEnter: checkAuth,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/auth/Login.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/maps",
    name: "Maps",
    component: () => import("../pages/Welcome.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/chart-full/:device",
    name: "ChartFull",
    component: () => import("../pages/ChartFull.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/chart-full-2/:device",
    name: "ChartFull2",
    component: () => import("../pages/ChartFull2.vue"),
    beforeEnter: checkAuth,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: () => import("../components/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (localStorage.is_admin == "true") {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
