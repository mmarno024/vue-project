import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const districtStore = defineStore("district", {
  state: () => ({
    dataDistrict: null,
    dataLookupDistrict: null,
  }),

  getters: {
    district: (state) => {
      state.dataDistrict, state.dataLookupDistrict;
    },
  },

  actions: {
    async getLookupDistricts(city) {
      const response = await axios.get(
        "/api/v1/index/kecamatan?kabupaten=" + city
      );
      this.dataLookupDistrict = response.data.data;
    },

    async getDistricts(page) {
      const response = await axios
        .get(`/api/v1/kecamatan?page=${page}`)
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Kesalahan Akses",
            text: error.response.data + "!",
          });
        });
      this.dataDistrict = response.data.data;
    },
  },
});
