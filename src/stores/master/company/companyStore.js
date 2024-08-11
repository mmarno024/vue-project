import { defineStore } from "pinia";
import axios from "axios";

export const companyStore = defineStore("companies", {
  state: () => ({
    dataCompany: [],
    dataLookupCompany: [],
  }),

  getters: {
    companies: (state) => {
      state.dataCompany, state.dataLookupCompany;
    },
  },

  actions: {
    async getLookupCompanies() {
      const response = await axios.get("/api/v1/instansi");
      this.dataLookupCompany = response.data.data;
    },

    async getCompanies(page) {
      const response = await axios.get(`/api/v1/instansi?page=${page}`);
      this.dataCompany = response.data.data;
      this.dataCompany.curent_page = response.data.meta.page;
      this.dataCompany.total_page = response.data.meta.pages;
    },
  },
});
