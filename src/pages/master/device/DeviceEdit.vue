<style>
input[type="checkbox"] {
  appearance: none;
  background: #fff;
  border: 0.1em solid #f6651c;
  height: 1.2em;
  width: 1.2em;
  border-radius: 5px;
  position: relative;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 8px;
  height: 15px;
  border: solid #3977e9;
  border-width: 0 5px 5px 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

input[type="checkbox"]:checked::before {
  opacity: 1;
}
</style>
<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">Master</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item" aria-current="page">Device</li>
            <li class="breadcrumb-item active" aria-current="page">Device</li>
          </ol>
        </nav>
      </div>
    </div>
    <h6 class="mb-0 text-uppercase">Device Create</h6>
    <hr />
    <form @submit.prevent="submitDevice">
      <div class="card">
        <div class="card-body">
          <div class="row g-3 mb-4">
            <div class="col-md-12">
              <router-link to="/device" class="btn btn-sm btn-dark">
                <i class="bx bx-left-arrow-circle"></i> Back
              </router-link>
            </div>
          </div>

          <div class="row g-3 mb-2">
            <div class="col-md-3">
              <label class="form-label">Type</label>
              <select
                class="form-select form-select-sm"
                v-model="form.device_type_id"
              >
                <option
                  v-for="vt in devicetypes.dataLookupDeviceType"
                  :value="vt.device_type_id"
                >
                  {{ vt.device_type_name }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ID</label>
              <input
                type="text"
                class="form-control"
                placeholder="Hardware ID"
                v-model="form.kd_hardware"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">UID</label>
              <input
                type="text"
                class="form-control"
                placeholder="UID"
                v-model="form.uid"
              />
            </div>
            <div class="col-md-2">
              <label class="form-label">Timezone<code>[minute]</code></label>
              <input
                type="number"
                class="form-control text-end"
                placeholder="0"
                v-model="form.timezone"
              />
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col-md-6">
              <label class="form-label">Site</label>
              <select
                class="form-select form-select-sm"
                v-model="form.instansi_id"
              >
                <option
                  v-for="vi in companies.dataLookupCompany"
                  :value="vi.id"
                >
                  {{ vi.nm_instansi }}
                </option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">Location</label>
              <input
                type="text"
                class="form-control"
                placeholder="Location"
                v-model="form.nm_lokasi"
              />
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col-md-3">
              <label class="form-label">Province</label>
              <select
                class="form-select form-select-sm"
                v-model="form.kd_provinsi"
                @change="getDataCity(form.kd_provinsi)"
              >
                <option
                  v-for="vt in provinces.dataLookupProvince"
                  :value="vt.kd_provinsi"
                >
                  {{ vt.nm_provinsi }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">City</label>
              <select
                class="form-select form-select-sm"
                v-model="form.kd_kabupaten"
                @change="getDataDistrict(form.kd_kabupaten)"
              >
                <option
                  v-for="vt in cities.dataLookupCity"
                  :value="vt.kd_kabupaten"
                >
                  {{ vt.nm_kabupaten }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">District</label>
              <select
                class="form-select form-select-sm"
                v-model="form.kd_kecamatan"
                @change="getDataSubDistrict(form.kd_kecamatan)"
              >
                <option
                  v-for="vt in districts.dataLookupDistrict"
                  :value="vt.kd_kecamatan"
                >
                  {{ vt.nm_kecamatan }}
                </option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">Sub District</label>
              <select class="form-select form-select-sm" v-model="form.kd_desa">
                <option
                  v-for="vt in subdistricts.dataLookupSubdistrict"
                  :value="vt.kd_desa"
                >
                  {{ vt.nm_desa }}
                </option>
              </select>
            </div>
          </div>
          <div class="row g-3 mb-2">
            <div class="col-md-2">
              <label class="form-label">Latitude</label>
              <input
                type="text"
                class="form-control text-end"
                placeholder="0"
                v-model="form.latitude"
              />
            </div>
            <div class="col-md-2">
              <label class="form-label">Longitude</label>
              <input
                type="text"
                class="form-control text-end"
                placeholder="0"
                v-model="form.longitude"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">API Key</label>
              <input
                type="text"
                class="form-control"
                placeholder="API Key"
                v-model="form.apikey"
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">API Secret</label>
              <input
                type="text"
                class="form-control"
                placeholder="API Secret"
                v-model="form.secret"
              />
            </div>
            <div class="col-md-2">
              <div>
                <label class="form-label">&nbsp;</label>
              </div>
              <div>
                <button
                  type="button"
                  class="btn btn-warning"
                  @click="secretKey"
                >
                  New Secret!
                </button>
              </div>
            </div>
          </div>

          <div class="row g-3 mb-2 mt-2 p-2" v-if="local_storage == 'true'">
            <div class="alert alert-info">
              <div class="row">
                <div class="col-md-2">
                  <label class="form-label">Expired Date</label>
                  <input type="date" class="form-control form-control-sm" />
                </div>
                <div class="col-md-2">
                  <label class="form-label">Enable</label>
                  <select class="form-select form-select-sm">
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-3 mb-2">
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Serie</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Unit</th>
                    <th class="bg-light-success">L1 Min</th>
                    <th class="bg-light-success">L1 Max</th>
                    <th class="bg-light-warning">L2 Min</th>
                    <th class="bg-light-warning">L2 Max</th>
                    <th class="bg-light-danger">L3 Min</th>
                    <th class="bg-light-danger">L3 Max</th>
                    <th>Gauge Min</th>
                    <th>Gauge Max</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>Gauge Type</th>
                    <th>Daily Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v1, index) in form.sensors" :key="index">
                    <td align="center" class="p-1">
                      <input
                        type="checkbox"
                        class="form-check"
                        v-model="v1.enabled"
                        :true-value="1"
                        :false-value="0"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm"
                        v-model="v1.no_seri"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm"
                        v-model="v1.kd_sensor"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm"
                        v-model="v1.nm_sensor"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm"
                        v-model="v1.satuan"
                      />
                    </td>
                    <td class="p-1 bg-light-success">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.level_1_from"
                      />
                    </td>
                    <td class="p-1 bg-light-success">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.level_1_to"
                      />
                    </td>
                    <td class="p-1 bg-light-warning">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.level_2_from"
                      />
                    </td>
                    <td class="p-1 bg-light-warning">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.level_2_to"
                      />
                    </td>
                    <td class="p-1 bg-light-danger">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.level_3_from"
                      />
                    </td>
                    <td class="p-1 bg-light-danger">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.level_3_to"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.gauge_min"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.gauge_max"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.major"
                      />
                    </td>
                    <td class="p-1">
                      <input
                        type="text"
                        class="form-control form-control-plaintext form-control-sm text-end"
                        v-model="v1.minor"
                      />
                    </td>
                    <td class="p-1">
                      <select
                        class="form-select form-select-sm"
                        v-model="v1.gauge_type"
                        style="width: auto; min-width: 100px"
                      >
                        <option value="default">Default</option>
                        <option value="compass">Compass</option>
                      </select>
                    </td>
                    <td class="p-1">
                      <select
                        class="form-select form-select-sm"
                        v-model="v1.daily_function"
                        style="width: auto; min-width: 100px"
                      >
                        <option value="AVG">Average</option>
                        <option value="SUM">Summary</option>
                        <option value="MIN">Minimum</option>
                        <option value="MAX">Maximum</option>
                      </select>
                    </td>
                    <td class="p-1">
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        @click="clearSensorTemplate(index)"
                      >
                        Clear
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="row g-3 mb-2">
            <div class="row row-cols-1 g-3 row-cols-lg-auto align-items-center">
              <div class="col">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="openModalSensorTemplate"
                >
                  Load Template
                </button>
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="submitSensorTemplate"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>

          <div class="row g-3 mt-3 mb-2">
            <div class="col-sm-12">
              <button type="submit" class="btn btn-warning" style="width: 100%">
                <i class="bx bx-save"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- Modal Sensor Template -->
  <div
    class="modal fade modal"
    id="modal_sensor_template"
    tabindex="-1"
    aria-labelledby="modal_sensor_template_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_sensor_template_label">
            Sensor Template
          </h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <select class="form-select" v-model="template_name">
                <option v-for="v in sensor_template" :value="v">
                  {{ v.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row col-sm-12">
            <div class="col-lg-3 col-sm-12 p-1 mb-1">
              <button
                type="button"
                class="btn btn-secondary"
                style="width: 100%"
                @click="closeModalSensorTemplate"
              >
                <i class="bx bx-x-circle"></i> Cancel
              </button>
            </div>
            <div class="col-lg-1 col-sm-12 p-1 mb-1"></div>
            <div class="col-lg-3 col-sm-12 p-1 mb-1">
              <button
                type="button"
                class="btn btn-danger"
                style="width: 100%"
                @click="clickDel(template_name)"
              >
                <i class="bx bx-trash"></i> Delete
              </button>
            </div>
            <div class="col-lg-5 col-sm-12 p-1 mb-1">
              <button
                type="button"
                class="btn btn-primary"
                style="width: 100%"
                @click="loadTemplate(template_name)"
              >
                <i class="bx bx-right-arrow-circle"></i> Load Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal Sensor Template -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { devicetypeStore } from "../../../stores/master/device-type/deviceTypeStore";
import { companyStore } from "../../../stores/master/company/companyStore";
import { provinceStore } from "../../../stores/master/region/provinceStore";
import { cityStore } from "../../../stores/master/region/cityStore";
import { districtStore } from "../../../stores/master/region/districtStore";
import { subdistrictStore } from "../../../stores/master/region/subdistrictStore";
import Swal from "sweetalert2";

const route = useRoute();

const devicetypes = devicetypeStore();
const companies = companyStore();
const provinces = provinceStore();
const cities = cityStore();
const districts = districtStore();
const subdistricts = subdistrictStore();

const local_storage = ref(localStorage.is_admin);

const modal_sensor_template = ref(null);

const form = ref({
  device_type_id: "",
  device_type_name: "",
  kd_hardware: "",
  uid: "",
  timezone: "",
  instansi_id: "",
  nm_instansi: "",
  nm_lokasi: "",
  kd_provinsi: "",
  nm_provinsi: "",
  kd_kabupaten: "",
  nm_kabupaten: "",
  kd_kecamatan: "",
  nm_kecamatan: "",
  kd_desa: "",
  nm_desa: "",
  latitude: "",
  longitude: "",
  apikey: "",
  secret: "",
  sensors: [],
});

const sensor_template = ref([]);
const template_name = ref("");
const template_name_save = ref("");

const getDataCity = async (province) => {
  cities.getLookupCities(province);
  form.value.kd_kabupaten = "";
  form.value.kd_kecamatan = "";
  form.value.kd_desa = "";
};

const getDataDistrict = async (city) => {
  districts.getLookupDistricts(city);
  form.value.kd_kecamatan = "";
  form.value.kd_desa = "";
};

const getDataSubDistrict = async (district) => {
  subdistricts.getLookupSubdistricts(district);
  form.value.kd_desa = "";
};

const secretKey = async () => {
  await axios
    .get("/api/v1/random-string")
    .then((response) => {
      form.value.secret = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getBlankSensorTemplate = () => {
  const max_sensor = 22;
  for (let i = 0; i < max_sensor; i++) {
    if (!form.value.sensors[i]) {
      form.value.sensors[i] = {};
    }
    form.value.sensors[i].no_slot = i + 1;
    form.value.sensors[i].no_seri = "";
    form.value.sensors[i].kd_sensor = "";
    form.value.sensors[i].nm_sensor = "";
    form.value.sensors[i].satuan = "";
    form.value.sensors[i].level_1_from = null;
    form.value.sensors[i].level_1_to = null;
    form.value.sensors[i].level_2_from = null;
    form.value.sensors[i].level_2_to = null;
    form.value.sensors[i].level_3_from = null;
    form.value.sensors[i].level_3_to = null;
    form.value.sensors[i].gauge_type = null;
    form.value.sensors[i].gauge_min = null;
    form.value.sensors[i].gauge_max = null;
    form.value.sensors[i].major = null;
    form.value.sensors[i].minor = null;
    form.value.sensors[i].daily_function = null;
    form.value.sensors[i].enabled = 0;
  }
};

const getSensorTemplate = async () => {
  await axios
    .get("/api/v1/sensor-templates")
    .then((response) => {
      if (response.status === 200) {
        sensor_template.value = response.data.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const loadTemplate = async (val) => {
  await axios
    .get(`/api/v1/sensor-templates/${val.name}`)
    .then((response) => {
      if (response.status === 200) {
        getBlankSensorTemplate();
        response.data.data.config.forEach((element, index) => {
          Object.assign(
            Object.assign(form.value.sensors[element.no_slot - 1], element),
            { no_seri: "-", enabled: 1 }
          );
        });
        closeModalSensorTemplate();
        template_name_save.value = val;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const clickDel = (val) => {
  Swal.fire({
    text: `Are you sure delete sensor template ${val.name}!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`/api/v1/sensor-templates/${val.name}`)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Deleted success",
              showConfirmButton: false,
              timer: 1500,
            });
            getSensorTemplate();
          }
        })
        .catch((error) => {
          Swal.fire({
            text: error.response.data.meta.message,
            icon: "warning",
          });
        });
    }
  });
};

const clearSensorTemplate = (i) => {
  form.value.sensors[i].no_seri = "";
  form.value.sensors[i].kd_sensor = "";
  form.value.sensors[i].nm_sensor = "";
  form.value.sensors[i].satuan = "";
  form.value.sensors[i].level_1_from = null;
  form.value.sensors[i].level_1_to = null;
  form.value.sensors[i].level_2_from = null;
  form.value.sensors[i].level_2_to = null;
  form.value.sensors[i].level_3_from = null;
  form.value.sensors[i].level_3_to = null;
  form.value.sensors[i].gauge_type = null;
  form.value.sensors[i].gauge_min = null;
  form.value.sensors[i].gauge_max = null;
  form.value.sensors[i].major = null;
  form.value.sensors[i].minor = null;
  form.value.sensors[i].daily_function = null;
  form.value.sensors[i].enabled = 0;
};

const submitSensorTemplate = () => {
  Swal.fire({
    text: "Template Name",
    input: "text",
    inputPlaceholder: "Enter something...",
    inputAttributes: {
      "aria-label": "Enter something",
    },
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    preConfirm: (inputValue) => {
      if (!inputValue || inputValue.trim() === "") {
        Swal.showValidationMessage("Field is required");
      }
      return inputValue;
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const cek = await axios.get("/api/v1/sensor-templates");
      const exists = cek.data.data.some(
        (sensor) => sensor.name === result.value
      );
      if (exists) {
        Swal.fire({
          text: "Are you sure overwrite '" + result.value + "' template?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, overwrite",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const dataSubmit = form.value.sensors.filter(
              (item) => item.kd_sensor !== "" || item.nm_sensor !== ""
            );
            await axios
              .put(`/api/v1/sensor-templates/${result.value}`, dataSubmit)
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              })
              .catch((error) => {
                Swal.fire({
                  text: error.response.data.meta.message,
                  icon: "warning",
                });
              });
          }
        });
      } else {
        const dataSubmit = form.value.sensors.filter(
          (item) => item.kd_sensor !== "" || item.nm_sensor !== ""
        );
        await axios
          .put(`/api/v1/sensor-templates/${result.value}`, dataSubmit)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Success",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              text: error.response.data.meta.message,
              icon: "warning",
            });
          });
      }
    }
  });
};

const submitDevice = async () => {
  const dataSubmitDevice = {
    device_type_id: form.value.device_type_id,
    kd_hardware: form.value.kd_hardware,
    uid: form.value.uid,
    instansi_id: form.value.instansi_id,
    kd_desa: form.value.kd_desa,
    nm_lokasi: form.value.nm_lokasi,
    latitude: form.value.latitude,
    longitude: form.value.longitude,
    timezone: form.value.timezone,
    apikey: form.value.apikey,
    secret: form.value.secret,
    sensors: form.value.sensors,
  };

  await axios
    .patch(`/api/v1/devices/${route.params.device}`, dataSubmitDevice)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        text: error.response.data.meta.message,
        icon: "warning",
      });
    });
};

onMounted(async () => {
  await axios
    .get("/api/v1/devices/" + route.params.device)
    .then((response) => {
      if (response.status === 200) {
        form.value.device_type_id = response.data.data.device_type_id;
        form.value.device_type_name = response.data.data.device_type_name;
        form.value.kd_hardware = response.data.data.kd_hardware;
        form.value.uid = response.data.data.uid;
        form.value.timezone = response.data.data.timezone;
        form.value.instansi_id = response.data.data.instansi_id;
        form.value.nm_instansi = response.data.data.nm_instansi;
        form.value.nm_lokasi = response.data.data.nm_lokasi;
        form.value.kd_provinsi = response.data.data.kd_provinsi;
        form.value.nm_provinsi = response.data.data.nm_provinsi;
        form.value.kd_kabupaten = response.data.data.kd_kabupaten;
        form.value.nm_kabupaten = response.data.data.nm_kabupaten;
        form.value.kd_kecamatan = response.data.data.kd_kecamatan;
        form.value.nm_kecamatan = response.data.data.nm_kecamatan;
        form.value.kd_desa = response.data.data.kd_desa;
        form.value.nm_desa = response.data.data.nm_desa;
        form.value.latitude = response.data.data.latitude;
        form.value.longitude = response.data.data.longitude;
        form.value.apikey = response.data.data.apikey;
        form.value.secret = response.data.data.secret;
      }
    })
    .catch((error) => {
      errMessage.value = error;
      Swal.fire({
        icon: "warning",
        title: "Kesalahan Akses",
        text: error.response.data + "!",
      });
    });

  await axios
    .get("/api/v1/devices/" + route.params.device + "/sensors")
    .then((response) => {
      if (response.status === 200) {
        getBlankSensorTemplate();
        response.data.data.forEach((element, index) => {
          Object.assign(
            Object.assign(form.value.sensors[element.no_slot - 1], element)
          );
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  devicetypes.getLookupDeviceTypes();
  companies.getLookupCompanies();
  provinces.getLookupProvinces();
  cities.getLookupCities(form.value.kd_provinsi);
  districts.getLookupDistricts(form.value.kd_kabupaten);
  subdistricts.getLookupSubdistricts(form.value.kd_kecamatan);
  modal_sensor_template.value = new bootstrap.Modal("#modal_sensor_template", {
    backdrop: "static",
    keyboard: false,
  });
});

function openModalSensorTemplate() {
  getSensorTemplate();
  modal_sensor_template.value.show();
}

function closeModalSensorTemplate() {
  modal_sensor_template.value.hide();
}
</script>
