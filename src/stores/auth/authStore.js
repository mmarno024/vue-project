import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => ({
    authUser: {},
    hasLogin: null,
  }),

  getters: {
    user: (state) => state.authUser,
  },

  actions: {
    async checkLogin() {
      if (localStorage.token) {
        this.hasLogin = true;
      } else {
        this.hasLogin = false;
      }
    },

    async checkAdmin() {
      if (localStorage.is_admin) {
        this.hasAdmin = true;
      } else {
        this.hasAdmin = false;
      }
    },

    async getUser() {
      this.authUser = {
        name: localStorage.user_name,
        email: localStorage.email,
        company: localStorage.nm_instansi,
      };
    },
  },
});
