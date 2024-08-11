import { defineStore } from "pinia";
import axios from "axios";

export const welcomeStore = defineStore("welcomes", {
  state: () => ({
    dataMapCompany: [],
    dataMapWaterhole: [],
    dataMapWaterholeAbsorp: [],
  }),

  getters: {
    welcomes: (state) => {
      state.dataMapCompany,
        state.dataMapWaterhole,
        state.dataMapWaterholeAbsorp;
    },
  },

  actions: {
    async getMapCompany() {
      const response = await axios.get("/api/map-company");
      this.dataMapCompany = response.data.data;
    },
    async getMapWaterhole() {
      const response = await axios.get("/api/map-waterhole");
      this.dataMapWaterhole = response.data.data;
    },
    async getMapWaterholeAbsorp() {
      const response = await axios.get("/api/map-waterhole-absorp");
      this.dataMapWaterholeAbsorp = response.data.data;
    },
  },
});
