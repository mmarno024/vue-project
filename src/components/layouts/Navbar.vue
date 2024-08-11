<template>
  <header>
    <div class="topbar d-flex align-items-center">
      <nav class="navbar navbar-expand gap-3">
        <div class="mobile-toggle-menu"><i class="bx bx-menu"></i></div>

        <div class="top-menu ms-auto">
          <ul class="navbar-nav align-items-center gap-1">
            <li class="nav-item dropdown dropdown-app">
              <div class="dropdown-menu dropdown-menu-end p-0">
                <div class="app-container p-2 my-2">
                  <div
                    class="row gx-0 gy-2 row-cols-3 justify-content-center p-2"
                  ></div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown dropdown-large">
              <div class="dropdown-menu dropdown-menu-end">
                <div class="header-message-list"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="user-box dropdown px-3">
          <a
            class="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/assets/images/user/man.png"
              class="user-img"
              alt="user avatar"
            />
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li class="text-center">
              <span
                v-if="useAuth.authUser"
                class="dropdown-item d-flex align-items-center text-warning"
              >
                {{
                  useAuth.authUser.name
                    ? useAuth.authUser.name.toUpperCase()
                    : ""
                }}
              </span>
            </li>
            <li>
              <router-link
                to="/profile"
                class="dropdown-item d-flex align-items-center"
                ><i class="bx bx-user-circle fs-5"></i
                ><span>Profil</span></router-link
              >
            </li>
            <li>
              <span
                class="dropdown-item d-flex align-items-center"
                style="cursor: pointer"
                ><i class="bx bx-log-out-circle"></i
                ><span @click="userLogout">Logout</span></span
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { authStore } from "../../stores/auth/authStore";

const useAuth = authStore();

const userLogout = async () => {
  await axios
    .post(`/api/v1/logout`)
    .then((response) => {
      document.location.href = "/login";
      localStorage.clear();
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(async () => {
  useAuth.getUser();
});
</script>
