import { defineStore } from "pinia";
import axios from "axios";

export const devicetypeStore = defineStore("devicetypes", {
  state: () => ({
    dataDeviceType: [],
    dataLookupDeviceType: [],
  }),

  getters: {
    devicetypes: (state) => {
      state.dataDeviceType, state.dataLookupDeviceType;
    },
  },

  actions: {
    async getLookupDeviceTypes() {
      const response = await axios.get("/api/v1/device-types");
      this.dataLookupDeviceType = response.data.data;
    },

    async getDeviceTypes(page) {
      const response = await axios.get(`/api/v1/device-types?page=${page}`);
      this.dataDeviceType = response.data.data;
      this.dataDeviceType.curent_page = response.data.meta.page;
      this.dataDeviceType.total_page = response.data.meta.pages;
    },
  },
});
