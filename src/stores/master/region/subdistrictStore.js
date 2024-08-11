import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const subdistrictStore = defineStore("subdistrict", {
  state: () => ({
    dataSubdistrict: null,
    dataLookupSubdistrict: null,
  }),

  getters: {
    subdistrict: (state) => {
      state.dataSubdistrict, state.dataLookupSubdistrict;
    },
  },

  actions: {
    async getLookupSubdistricts(district) {
      const response = await axios.get(
        "/api/v1/index/desa?kecamatan=" + district
      );
      this.dataLookupSubdistrict = response.data.data;
    },

    async getSubdistricts(page) {
      const response = await axios
        .get(`/api/v1/desa?page=${page}`)
        .catch((error) => {
          Swal.fire({
            icon: "warning",
            title: "Kesalahan Akses",
            text: error.response.data + "!",
          });
        });
      this.dataSubdistrict = response.data.data;
    },
  },
});
