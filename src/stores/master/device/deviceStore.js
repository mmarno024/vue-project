import { defineStore } from "pinia";
import axios from "axios";

export const deviceStore = defineStore("devices", {
  state: () => ({
    dataDevice: [],
  }),

  getters: {
    devices: (state) => state.dataDevice,
  },

  actions: {
    async getLookupDevices() {
      const response = await axios.get("/api/v1/devices");
      this.dataLookupDevice = response.data.data;
    },

    async getDevices(page) {
      const response = await axios.get(`/api/v1/devices?page=${page}`);
      this.dataDevice = response.data.data;
      this.dataDevice.curent_page = response.data.meta.page;
      this.dataDevice.total_page = response.data.meta.pages;
    },
  },
});
