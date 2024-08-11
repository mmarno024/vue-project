<style>
img {
  filter: drop-shadow(1px 0 0 white) drop-shadow(0 1px 0 white)
    drop-shadow(-1px 0 0 white) drop-shadow(0 -1px 0 white);
}
</style>
<template>
  <!--wrapper-->
  <div>
    <header class="mb-5">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-gradient-orange fixed-top rounded-0 shadow-none border-bottom"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="/assets/images/logo/logo_mpn_notext.png"
              width="40"
              alt=""
            />
            <strong class="text-white ms-3">PT. MULIA PRIMA NUSA</strong>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent1">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <span>
                  <router-link to="#" class="nav-link text-white" href="#"
                    ><i class="bx bx-user me-1"></i
                    >{{
                      useAuth.authUser.name
                        ? useAuth.authUser.name.toUpperCase()
                        : ""
                    }}</router-link
                  >
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <body>
      <div class="col-sm-12 px-3 pt-3 pb-0">
        <div class="card bg-gradient-deepblue text-white mt-2 mb-0 pb-0">
          <div class="card-body">
            <div class="col-sm-12">
              <span
                ><i class="bx bx-caret-right-circle"></i> Device :
                <strong>{{ devicedetail.kd_hardware }}</strong></span
              >
              <span> | </span>
              <span
                >UID : <strong>{{ devicedetail.uid }}</strong></span
              >
            </div>
            <div class="col-sm-12">
              <span
                ><i class="bx bx-caret-right-circle"></i> Company :
                <strong>{{ devicedetail.nm_instansi }}</strong></span
              >
              <span> | </span>
              <span
                >Timezone : <strong>{{ devicedetail.timezone }}</strong></span
              >
            </div>
            <div class="col-sm-12">
              <span
                ><i class="bx bx-caret-right-circle"></i> Location :
                <strong>{{ devicedetail.nm_lokasi }}</strong></span
              >
              <span> ( </span>
              <span
                ><strong>{{
                  devicedetail.nm_desa ? devicedetail.nm_desa : ""
                }}</strong></span
              >
              <span v-if="devicedetail.nm_desa && devicedetail.nm_kecamatan"
                >,
              </span>
              <span
                ><strong>{{
                  devicedetail.nm_kecamatan ? devicedetail.nm_kecamatan : ""
                }}</strong></span
              >
              <span
                v-if="devicedetail.nm_kecamatan && devicedetail.nm_kabupaten"
                >,
              </span>
              <span
                ><strong>{{
                  devicedetail.nm_kabupaten ? devicedetail.nm_kabupaten : ""
                }}</strong></span
              >
              <span v-if="devicedetail.nm_kabupaten && devicedetail.nm_provinsi"
                >,
              </span>
              <span
                ><strong>{{
                  devicedetail.nm_provinsi ? devicedetail.nm_provinsi : ""
                }}</strong></span
              >
              <span> ) </span>
            </div>
            <div class="col-sm-12">
              <span
                ><i class="bx bx-caret-right-circle"></i> Last Data :
                <strong>{{ last_data }}</strong></span
              >
              <span> | </span>
              <span
                >Total Data : <strong>{{ total_data }} </strong> at
                <strong>{{ last_data_format }}</strong></span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 p-3">
        <div class="card">
          <div class="card-body">
            <div class="col-sm-12">
              <div class="row">
                <div class="col-sm-1">
                  <router-link
                    to="/maps"
                    type="button"
                    class="btn btn-dark btn-sm"
                    style="width: 100%"
                  >
                    <i class="bx bx-left-arrow-circle"></i> Back
                  </router-link>
                </div>
                <div class="col-sm-11">
                  <div class="btn-group mb-1" role="group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary px-5"
                      :class="{ active: view_type === 'gaug' }"
                      @click="updateView('gaug')"
                    >
                      <i class="bx bx-doughnut-chart bx-xs"></i> View Gauge
                      Chart
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-primary px-5"
                      :class="{ active: view_type === 'line' }"
                      @click="updateView('line')"
                    >
                      <i class="bx bx-line-chart bx-xs"></i> View Line Chart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="col-sm-12" v-if="view_type == 'gaug'">
              <div class="row">
                <div
                  class="col-md-4 col-sm-6 p-3"
                  v-for="(value, index) in gaugeChart"
                  :key="index"
                >
                  <div
                    class="col-sm-12 p-3"
                    :class="{
                      'bg-light-danger': value.status_level == 3,
                      'bg-light-warning': value.status_level == 2,
                      'bg-light-success': value.status_level == 1,
                      'bg-light-secondary':
                        value.status_level != 1 &&
                        value.status_level != 2 &&
                        value.status_level != 3,
                    }"
                    style="border: 1px solid #ccc; border-radius: 5px"
                  >
                    <div class="row">
                      <div
                        class="col-md-7 col-sm-12"
                        v-show="viewGauge[index] != null"
                      >
                        <GChart
                          v-if="value.gauge_type == 'default'"
                          :data="gaugeData[index]"
                          type="Gauge"
                          :options="gaugeOptions[index]"
                          :settings="gaugeSettings"
                        ></GChart>
                        <div
                          id="container"
                          v-if="value.gauge_type == 'compass'"
                        ></div>
                      </div>
                      <div class="col-md-5 col-sm-12">
                        <h3 class="text-black my-5">
                          {{ value.nm_sensor }}
                          <span style="font-size: 18px"
                            >[{{ value.satuan }}]</span
                          >
                        </h3>
                        <table
                          class="table table-bordered bg-white"
                          style="font-size: 18px; border-radius: 8px"
                        >
                          <tr>
                            <td class="p-2" align="left">Value</td>
                            <td class="p-2" align="right">
                              <strong>{{ value.value }}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td class="p-2" align="left">Minimal</td>
                            <td class="p-2" align="right">
                              <strong>{{ value.min }}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td class="p-2" align="left">Maximal</td>
                            <td class="p-2" align="right">
                              <strong>{{ value.max }}</strong>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12" v-if="view_type == 'line'">
              <div class="row">
                <div
                  class="col-md-4 col-sm-6 p-3"
                  v-for="(value, index) in lineChart"
                  :key="index"
                >
                  <div
                    class="col-sm-12 p-3"
                    style="border: 1px solid #ccc; border-radius: 5px"
                  >
                    <LineChart
                      :chartData="value"
                      :options="lineOptions[index]"
                      style="height: 400px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>

    <footer class="bg-body shadow-none border-top p-2 text-center fixed-bottom">
      <p class="mb-0">Copyright © 2023. All right reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { authStore } from "../stores/auth/authStore";
import { GChart } from "vue-google-charts";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import { format } from "date-fns";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

Chart.register(...registerables);

const chartOptions = ref({});

const route = useRoute();
const useAuth = authStore();

const view_type = ref("gaug");

const devicedetail = ref({
  kd_hardware: "",
  uid: "",
  nm_instansi: "",
  timezone: "",
  nm_lokasi: "",
  nm_provinsi: "",
  nm_kabupaten: "",
  nm_kecamatan: "",
  nm_desa: "",
});

const gaugeChart = ref([]);
const gaugeData = ref([]);
const gaugeOptions = ref([]);
const viewGauge = ref([]);

const lineLabel = ref([]);
const lineData = ref([]);
const lineChart = ref({});
const lineOptions = ref({});

const last_data = ref("");
const last_data_format = ref("");
const total_data = ref(0);

const detailDevice = async () => {
  await axios
    .get(`/api/v1/devices/${route.params.device}`)
    .then((response) => {
      devicedetail.value.kd_hardware = response.data.data.kd_hardware;
      devicedetail.value.uid = response.data.data.uid;
      devicedetail.value.nm_instansi = response.data.data.nm_instansi;
      devicedetail.value.timezone = response.data.data.timezone;
      devicedetail.value.nm_lokasi = response.data.data.nm_lokasi;
      devicedetail.value.nm_provinsi = response.data.data.nm_provinsi;
      devicedetail.value.nm_kabupaten = response.data.data.nm_kabupaten;
      devicedetail.value.nm_kecamatan = response.data.data.nm_kecamatan;
      devicedetail.value.nm_desa = response.data.data.nm_desa;
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateView = (val) => {
  view_type.value = val;
  listGaugeChart(route.params.device);
  listLineChart(route.params.device);
};

const listLineChart = async (kd_hardware) => {
  await axios
    .get(`api/v1/devices/${kd_hardware}/chart_data`)
    .then((response) => {
      lineLabel.value = response.data.data.chart.labels;
      lineData.value = response.data.data.chart.datasets;
    })
    .catch((error) => {
      console.log(error);
    });

  const colors = [
    "#FF6F61",
    "#45E7C8",
    "#F4D03F",
    "#6A0DAD",
    "#00BFFF",
    "#DA70D6",
    "#FE4164",
    "#9DF3C4",
    "#FF8243",
    "#FF7E4B",
    "#E6E6FA",
    "#A9FFBF",
    "#FF6D91",
    "#DAA520",
    "#4E5180",
    "#0F52BA",
    "#FFC1CC",
    "#7DF9FF",
    "#FFAA5A",
    "#39FF14",
  ];

  lineData.value.forEach((element, index) => {
    lineChart.value[index] = {
      labels: lineLabel.value,
      datasets: [
        {
          label: element.kd_sensor,
          data: element.data,
          fill: true,
          borderColor: colors[index],
        },
      ],
    };
    lineOptions.value[index] = {
      scales: {
        y: {
          beginAtZero: false,
        },
        x: {
          display: true,
          type: "time",
          time: {
            unit: "hour",
            unitStepSize: 1,
            displayFormats: {
              millisecond: "HH:mm:ss.SSS",
              second: "HH:mm:ss",
              minute: "HH:mm",
              hour: "HH:00",
            },
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: true,
          text: element.kd_sensor + " [" + element.satuan + "]",
          font: {
            size: 20,
            weight: "normal",
          },
        },
      },
    };
  });
};

const listGaugeChart = async (kd_hardware) => {
  await nextTick();
  await axios
    .get(`api/v1/devices/${kd_hardware}/gauge_data`)
    .then((response) => {
      gaugeChart.value = response.data.data.latest_state.sensor_values;
      last_data.value = response.data.data.latest_state.time_local;
      last_data_format.value = format(last_data.value, "yyyy-MM-dd");
      total_data.value = response.data.data.latest_state.count_daily_data;
    })
    .catch((error) => {
      console.log(error);
    });

  gaugeChart.value.forEach((element, index) => {
    viewGauge.value[index] = element.value;

    const arrLevel = ref([
      element.level_1_from,
      element.level_1_to,
      element.level_2_from,
      element.level_2_to,
      element.level_3_from,
      element.level_3_to,
    ]);

    const maxArr = ref(Math.max(...arrLevel.value));
    const minArr = ref(Math.min(...arrLevel.value));

    const mostTick = ref(10);
    const tick = ref(0);

    const minGrid = ref(
      (maxArr.value == 0 ? 10 : maxArr.value) / mostTick.value
    );
    const magnitude = ref(10 ** Math.floor(Math.log10(minGrid.value)));
    const residual = ref(minGrid.value / magnitude.value);

    if (residual.value > 5) {
      tick.value = 10 * magnitude.value;
    } else if (residual.value > 2) {
      tick.value = 5 * magnitude.value;
    } else if (residual.value > 1) {
      tick.value = 2 * magnitude.value;
    } else {
      tick.value = magnitude.value;
    }

    const arrMajor = ref([]);
    arrMajor.value = [];
    for (
      let num = minArr.value;
      num <= (maxArr.value == 0 ? 10 : maxArr.value);
      num += tick.value
    ) {
      arrMajor.value.push(num);
    }

    const arrMajorString = arrMajor.value.map((num) => String(num));

    if (element.gauge_type == "default") {
      gaugeData.value[index] = [
        ["Label", "Value"],
        [element.satuan, element.value],
      ];
      gaugeOptions.value[index] = {
        width: 300,
        height: 300,
        greenFrom: element.dials[0].min,
        greenTo: element.dials[0].max,
        greenColor: element.dials[0].color,
        yellowFrom: element.dials[1].min,
        yellowTo: element.dials[1].max,
        yellowColor: element.dials[1].color,
        redFrom: element.dials[2].min,
        redTo: element.dials[2].max,
        redColor: element.dials[2].color,
        minorTicks: 5,
        majorTicks: arrMajorString,
        min: element.gauge_min,
        max: element.gauge_max,
      };
    } else if (element.gauge_type == "compass") {
      chartOptions.value = {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: true,
          width: 300,
          height: 300,
        },
        accessibility: {
          enabled: false,
        },
        title: {
          text: "",
        },
        pane: {
          startAngle: 0,
          endAngle: 360,
          background: [
            {
              borderWidth: 1,
              outerRadius: "50%",
            },
            {
              backgroundColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1,
                },
                stops: [
                  [0, "#FFF"],
                  [1, "#333"],
                ],
              },
              borderWidth: 4,
              outerRadius: "110%",
            },
            {
              backgroundColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1,
                },
                stops: [
                  [0, "#333"],
                  [1, "#FFF"],
                ],
              },
              borderWidth: 4,
              outerRadius: "10%",
            },
            {
              // default background
            },
            {
              backgroundColor: "#DDD",
              borderWidth: 4,
              outerRadius: "105%",
              innerRadius: "100%",
            },
          ],
        },
        yAxis: [
          {
            title: {
              text: "",
            },
            min: 0,
            max: 360,
            lineColor: "#333",
            offset: -10,
            tickInterval: 20,
            tickWidth: 2,
            tickPosition: "outside",
            tickLength: 10,
            tickColor: "#333",
            minorTickInterval: 5,
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: "outside",
            minorTickColor: "#666",
            labels: {
              step: 1,
              distance: -12,
              rotation: "auto",
              style: {
                fontSize: "14px",
              },
            },
          },
          {
            title: {
              text: "Direction",
            },
            type: "category",
            categories: ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"],
            min: 0,
            max: 8,
            lineColor: "#ddd",
            offset: -50,
            tickInterval: 1,
            tickWidth: 1,
            tickPosition: "outside",
            tickLength: 40, // =50-10
            tickColor: "#ddd",
            minorTickInterval: 1,
            minorTickWidth: 0,
            minorTickLength: 50,
            minorTickPosition: "inside",
            minorTickColor: "#0f0",
            labels: {
              step: 1,
              distance: 2,
              rotation: "auto",
              style: {
                fontSize: "20px",
              },
            },
            endOnTick: true,
          },
          {
            type: "number",
            title: {
              text: "",
            },
            labels: {
              enabled: false,
            },
            min: 0,
            max: 12,
            lineColor: "#ddd",
            offset: -50,
            tickInterval: 10,
            tickWidth: 1,
            tickPosition: "inside",
            tickLength: 45,
            tickColor: "#ddd",
            minorTickWidth: 0,
            endOnTick: false,
          },
        ],
        series: [
          {
            name: "Value",
            yAxis: 0,
            data: [0],
            dial: {
              radius: "65%",
              baseWidth: 10,
              baseLength: "0%",
              rearLength: 0,
              borderWidth: 1,
              borderColor: "#9A0000",
              backgroundColor: "#CC0000",
            },
            tooltip: {
              valueSuffix: "°",
              style: {
                fontSize: "16px",
              },
            },
          },
          {
            name: "Value",
            yAxis: 0,
            data: [0],
            dial: {
              radius: "-65%",
              baseWidth: 10,
              baseLength: "0%",
              rearLength: 0,
              borderWidth: 1,
              borderColor: "#1B4684",
              backgroundColor: "#3465A4",
            },
            tooltip: {
              valueSuffix: "°",
              style: {
                fontSize: "16px",
              },
            },
          },
        ],
        credits: {
          enabled: false,
        },
      };

      const chart = Highcharts.chart("container", chartOptions.value);

      const point = chart.series[0].points[0];
      let newVal = point.y + element.value;
      if (newVal < 0 || newVal > 360) {
        newVal = point.y - element.value;
      }
      point.update(newVal);
      const point2 = chart.series[1].points[0];
      point2.update(newVal);
    }
  });
};
const gaugeSettings = ref({ packages: ["gauge"] });

const updateCharts = async (device) => {
  await listGaugeChart(device);
  await listLineChart(device);
};

const fetchInitialData = async () => {
  useAuth.getUser();
  await detailDevice();
  await updateCharts(route.params.device);
};

onMounted(async () => {
  fetchInitialData();

  const interval = setInterval(() => {
    updateCharts(route.params.device);
  }, 30000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>
