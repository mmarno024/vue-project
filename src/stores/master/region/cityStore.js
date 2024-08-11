import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const cityStore = defineStore("city", {
  state: () => ({
    dataCity: null,
    dataLookupCity: null,
  }),

  getters: {
    city: (state) => {
      state.dataCity, state.dataLookupCity;
    },
  },

  actions: {
    async getLookupCities(province) {
      const response = await axios.get(
        "api/v1/index/kabupaten?provinsi=" + province
      );
      this.dataLookupCity = response.data.data;
    },

    async getCities(page) {
      const response = await axios
        .get(`/api/v1/kabupaten?page=${page}`)
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Kesalahan Akses",
            text: error.response.data + "!",
          });
        });
      this.dataCity = response.data.data;
    },
  },
});
