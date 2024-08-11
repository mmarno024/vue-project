import { createApp } from "vue";
import { createPinia } from "pinia";
import { createBootstrap } from "bootstrap-vue-next";
import $ from "jquery";
import Select2 from "vue3-select2-component";
import App from "./App.vue";
import router from "./router";
import "../axios";

import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(createBootstrap());
app.component("Select2", Select2);
app.use(HighchartsVue);

HighchartsMore(Highcharts);

app.config.globalProperties.$highcharts = Highcharts;

app.mount("#app");
