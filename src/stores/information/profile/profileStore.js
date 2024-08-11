import { defineStore } from "pinia";
import axios from "axios";

export const profileStore = defineStore("profiles", {
  state: () => ({
    dataProfile: [],
  }),

  getters: {
    profiles: (state) => state.dataProfile,
  },

  actions: {
    async getLookupProfile() {
      const response = await axios.get("/api/v1/user-activities");
      this.dataLookupProfile = response.data.data;
    },

    async getProfile() {
      const response = await axios.get(`/api/v1/system/logs`);
      this.dataProfile = response.data.data;
    },
  },
});
