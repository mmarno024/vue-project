<style>
#map {
  height: 100vh;
}
.sidebar {
  width: 400px;
  position: absolute;
  top: 70px;
  left: 5px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  transform: translateX(0);
}
.sidebar .close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}
.open_sidebar_button {
  width: 30px;
  position: absolute;
  top: 70px;
  left: 5px;
  padding: 5px;
  border-radius: 5px;
  z-index: 999;
  cursor: pointer;
}
.admin_button {
  min-width: 30px;
  position: absolute;
  top: 70px;
  right: 5px;
  padding: 5px;
  border-radius: 5px;
  z-index: 999;
  cursor: pointer;
  font-weight: normal;
}
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
                  <router-link to="/maps" class="nav-link text-white" href="#"
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
      <div id="map" style="height: 91vh"></div>
      <div
        id="admin_button"
        class="admin_button bg-danger text-white"
        @click="showAdminMap"
      >
        Click to Admin Mode
      </div>
      <div
        v-show="open_sidebar == false"
        id="open_sidebar_button"
        class="open_sidebar_button bg-gradient-blues text-white"
        @click="change_sidebar(true)"
      >
        <i class="bx bx-arrow-to-right"></i>
      </div>
      <div v-show="open_sidebar == true" id="sidebar" class="sidebar">
        <div
          class="close-btn bg-gradient-blues text-white"
          @click="change_sidebar(false)"
        >
          <i class="bx bx-arrow-to-left"></i>
        </div>
        <h6>Hardware List</h6>
        <hr />
        <div class="col-sm-12 mb-2">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search Hardware"
            v-model="search"
          />
        </div>
        <div class="col-sm-12 mb-3">
          <div class="p-1 alert alert-info">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-check text-start">
                  <input
                    class="form-check-input bg-info"
                    type="checkbox"
                    id="uptodate"
                    v-model="uptodate"
                  />
                  <label for="uptodate" class="form-check-label"
                    >Up to date</label
                  >
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-check text-start">
                  <input
                    class="form-check-input bg-info"
                    type="checkbox"
                    id="active"
                    v-model="active"
                  />
                  <label for="active" class="form-check-label">Active</label>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-check text-start">
                  <input
                    class="form-check-input bg-info"
                    type="checkbox"
                    id="inactive"
                    v-model="inactive"
                  />
                  <label for="inactive" class="form-check-label"
                    >Inactive</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive" style="height: 60vh; font-size: 12px">
          <table width="95%">
            <tr v-for="(v, k) in filteredData" in :key="k">
              <td>
                <div
                  class="mb-1 p-1"
                  :class="{
                    'alert alert-secondary': v.status == 0,
                    'alert alert-info': v.status != 0,
                  }"
                  style="width: 100%; cursor: pointer"
                  @click="
                    contentMarker(
                      v.kd_hardware,
                      v.latitude,
                      v.longitude,
                      v.nm_instansi
                    )
                  "
                >
                  <div
                    class="chip chip-lg bg-primary bg-gradient text-white mb-0 rounded-1"
                    style="font-size: 10px"
                  >
                    {{ v.kd_hardware }} - {{ v.uid }}
                  </div>
                  <div>
                    <strong class="text-warning">{{ v.nm_lokasi }}</strong>
                  </div>
                  <div class="badge rounded bg-light-info text-primary">
                    Last Update : {{ v.last_push }}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </body>

    <footer class="bg-body shadow-none border-top p-2 text-center fixed-bottom">
      <p class="mb-0">Copyright © 2023. All right reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import icon from "leaflet/dist/images/location-pin.png";
import { authStore } from "../stores/auth/authStore";

const useAuth = authStore();

const initialMap = ref(null);
const deviceMap = ref([]);
const marker = ref([]);
const content = ref("");
const mapIcon = ref({});

let search = ref("");
const uptodate = ref(true);
const active = ref(true);
const inactive = ref(true);

const open_sidebar = ref(false);
const change_sidebar = (val) => {
  open_sidebar.value = val;
};

const showAdminMap = () => {
  document.location.href = "/";
};

const fetchDeviceData = async () => {
  try {
    const response = await axios.get("/api/v1/map/devices");
    deviceMap.value = response.data.data;
    updateMapMarkers();
  } catch (error) {
    console.log(error);
  }
};

const updateMapMarkers = () => {
  marker.value.forEach((m) => m.remove());
  marker.value = [];

  deviceMap.value.forEach((element, index) => {
    const lat = element.latitude == null ? 0 : parseFloat(element.latitude);
    const lng = element.longitude == null ? 0 : parseFloat(element.longitude);
    const instansi =
      element.nm_instansi == null ? "No Company" : element.nm_instansi;
    const newMarker = L.marker([lat, lng], { icon: mapIcon.value });
    newMarker._icond_id = element.kd_hardware;
    newMarker._lat = element.latitude;
    newMarker._lng = element.longitude;
    newMarker._instansi = instansi;
    newMarker.addTo(initialMap.value);
    newMarker.on("click", markerClicked);
    marker.value.push(newMarker);
  });
};

const mapContainer = () => {
  initialMap.value = L.map("map", {
    zoomControl: false,
    zoomAnimation: false,
    fadeAnimation: true,
    markerZoomAnimation: true,
    closePopupOnClick: false,
    scrollWheelZoom: true,
  }).setView([-1.506745, 109.183856], 6);
  L.tileLayer(
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      minZoom: 5,
      maxZoom: 18,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
  ).addTo(initialMap.value);

  L.control
    .scale({
      position: "bottomleft",
    })
    .addTo(initialMap.value);

  L.control
    .zoom({
      position: "bottomleft",
    })
    .addTo(initialMap.value);

  mapIcon.value = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
  });

  deviceMap.value.forEach((element, index) => {
    const lat = element.latitude == null ? 0 : parseFloat(element.latitude);
    const lng = element.longitude == null ? 0 : parseFloat(element.longitude);
    const instansi =
      element.nm_instansi == null ? "No Company" : element.nm_instansi;
    marker.value = L.marker([lat, lng], { icon: mapIcon.value });
    marker.value._icond_id = element.kd_hardware;
    marker.value._lat = element.latitude;
    marker.value._lng = element.longitude;
    marker.value._instansi = instansi;
    marker.value._is_expired = element.is_expired;
    marker.value.addTo(initialMap.value);
    marker.value.on("click", markerClicked);
  });
};

const markerClicked = function (e) {
  const device = e.target._icond_id;
  const latitude = e.target._lat;
  const longitude = e.target._lng;
  const instansi = e.target._instansi;
  const is_expired = e.target._is_expired;
  contentMarker(device, latitude, longitude, instansi, is_expired);
};

const contentMarker = async (
  device,
  latitude,
  longitude,
  instansi,
  is_expired
) => {
  await axios.get(`/api/v1/devices/${device}/summary`).then((response) => {
    const summary =
      response.data.data.latest_state.sensor_values == null
        ? []
        : response.data.data.latest_state.sensor_values;

    content.value = `<div class="mb-2"><strong class="text-warning">${instansi}</strong></div>`;
    content.value += `<div class="card radius-5 bg-gradient-deepblue text-white">`;
    content.value += `<div class="card-body">`;
    content.value += `<div><strong><i class="bx bx-map-alt"></i> ${response.data.data.device.nm_lokasi}</strong></div>`;
    content.value += `<div><strong><i class="bx bx-mobile"></i> ${response.data.data.device.kd_hardware} - ${response.data.data.device.uid}</div></strong>`;
    content.value += `<div><strong><i class="bx bx-map-pin"></i> ${latitude} - ${longitude}</div></strong>`;
    content.value += `<div><strong><i class="bx bx-calendar"></i> ${response.data.data.latest_state.time_local}</strong></div>`;
    content.value += `</div>`;
    content.value += `</div>`;
    content.value += `<table class="table table-striped table-bordered radius-5" width="100%;">`;
    content.value += `<thead>`;
    content.value += `<tr>`;
    content.value += `<th align='center' style='padding:8px;'>SENSOR</th>`;
    content.value += `<th align='center' style='padding:8px;'>VALUE</th>`;
    content.value += `<th align='center' style='padding:8px;'>SATUAN</th>`;
    content.value += `</tr>`;
    content.value += `</thead>`;
    content.value += `<tbody>`;

    summary.forEach((element1, index1) => {
      if (element1.status_level == 1) {
        content.value += `<tr class="bg-light-success">`;
      } else if (element1.status_level == 2) {
        content.value += `<tr class="bg-light-warning">`;
      } else if (element1.status_level == 3) {
        content.value += `<tr class="bg-light-danger">`;
      } else {
        content.value += `<tr class="bg-light-secondary">`;
      }
      content.value += `<td style='padding:8px;'>${element1.nm_sensor}</td>`;
      content.value += `<td align='right' style='padding:8px;'>${element1.value}</td>`;
      content.value += `<td align='center' style='padding:8px;'>${element1.satuan}</td>`;
      content.value += `</tr>`;
    });

    content.value += `</tbody>`;
    content.value += `</table>`;
    content.value += `<div class="row">`;
    if (
      localStorage.is_admin == "true" ||
      (localStorage.is_admin == "false" && is_expired == 0)
    ) {
      content.value += `<div class="col-sm-6 text-start text-primary"><strong><a href="/chart-full/${device}" style='cursor:pointer'>Detail <i class="fa fa-arrow-circle-right"></i></a></strong></div>`;
    }
    content.value += `<div class="col-sm-6 text-end text-primary"><strong><a href='https://www.google.com/maps/dir/?api=1&destination=${latitude}, ${longitude}' target='_blank' style='cursor:pointer'>Rute lokasi <i class="fa fa-map-marker"></i></a></strong></div>`;

    content.value += `</div>`;

    L.marker([latitude, longitude], { icon: mapIcon.value })
      .addTo(initialMap.value)
      .bindPopup(content.value)
      .openPopup();
  });
};

const filteredData = computed(() => {
  let filteredList = deviceMap.value;

  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    filteredList = filteredList.filter((item) =>
      item.nm_lokasi.toLowerCase().includes(searchTerm)
    );
  }

  if (uptodate.value === false) {
    filteredList = filteredList.filter(
      (item) => item.status === 1 || item.status === 0
    );
  }
  if (active.value === false) {
    filteredList = filteredList.filter(
      (item) => item.status === -1 || item.status === 0
    );
  }
  if (inactive.value === false) {
    filteredList = filteredList.filter(
      (item) => item.status === -1 || item.status === 1
    );
  }

  return filteredList;
});

onMounted(async () => {
  fetchDeviceData();
  const interval = setInterval(fetchDeviceData, 60000);

  onUnmounted(() => {
    clearInterval(interval);
  });

  mapContainer();
});
</script>
