import { defineStore } from "pinia";
import axios from "axios";

export const userStore = defineStore("users", {
  state: () => ({
    dataUser: [],
  }),

  getters: {
    users: (state) => state.dataUser,
  },

  actions: {
    async getLookupUsers() {
      const response = await axios.get("/api/v1/users");
      this.dataLookupUser = response.data.data;
    },

    async getUsers(page) {
      const response = await axios.get(`/api/v1/users?page=${page}`);
      this.dataUser = response.data.data;
      this.dataUser.curent_page = response.data.meta.page;
      this.dataUser.total_page = response.data.meta.pages;
    },
  },
});
