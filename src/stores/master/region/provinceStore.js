import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const provinceStore = defineStore("province", {
  state: () => ({
    dataProvince: null,
    dataLookupProvince: null,
  }),

  getters: {
    province: (state) => {
      state.dataProvince, state.dataLookupProvince;
    },
  },

  actions: {
    async getLookupProvinces() {
      const response = await axios.get("/api/v1/provinsi");
      this.dataLookupProvince = response.data.data;
    },

    async getProvinces(page) {
      const response = await axios
        .get(`/api/v1/provinsi?page=${page}`)
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Kesalahan Akses",
            text: error.response.data + "!",
          });
        });
      this.dataProvince = response.data.data;
    },
  },
});
