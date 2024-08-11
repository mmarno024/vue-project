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
    <h6 class="mb-0 text-uppercase">Device List</h6>
    <hr />
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <div class="col-md-12 mb-3">
            <div class="row g-3">
              <div class="col-md-6">
                <router-link to="/device-add" class="btn btn-sm btn-warning">
                  <i class="bx bx-mobile"></i> Create
                </router-link>
              </div>
              <div class="col-md-3 text-end px-2">
                <button
                  type="button"
                  class="btn btn-sm px-4 mx-1"
                  :class="{
                    'btn-danger': filter_expired == 1,
                    'btn-info': filter_expired == 0,
                  }"
                  @click="filterExpired(filter_expired == 0 ? 1 : 0)"
                >
                  <span v-if="filter_expired == 1">
                    <i class="bx bx-down-arrow-circle"></i> Expired
                  </span>
                  <span v-else>
                    <i class="bx bx-up-arrow-circle"></i> Active
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-sm px-4 mx-1"
                  :class="{
                    'btn-danger': filter_disabled == 1,
                    'btn-info': filter_disabled == 0,
                  }"
                  @click="filterDisabled(filter_disabled == 0 ? 1 : 0)"
                >
                  <span v-if="filter_disabled == 1">
                    <i class="bx bx-x-circle"></i> Disable
                  </span>
                  <span v-else>
                    <i class="bx bx-check-circle"></i> Enable
                  </span>
                </button>
              </div>
              <div class="col-md-3 text-end">
                <div class="position-relative input-icon">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="input14"
                    placeholder="Search ..."
                    v-model="search"
                    @keyup="searchAndPagination"
                  />
                  <span class="position-absolute top-50 translate-middle-y"
                    ><i class="bx bx-search"></i
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <table id="example" class="table table-striped table-bordered">
            <thead>
              <tr class="text-center">
                <th width="5%">Action</th>
                <th width="5%">ID</th>
                <th width="15%">UID</th>
                <th width="5%">Timezone</th>
                <th width="30%">Location</th>
                <th width="25%">Company</th>
                <th width="5%">Expired</th>
                <th width="5%" v-if="local_storage == 'true'">Enable</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(device, index) in devices.dataDevice" :key="index">
                <td>
                  <div class="d-block d-md-flex justify-content-between">
                    <div class="d-flex order-actions">
                      <router-link
                        :to="`/device-edit/${device.kd_hardware}`"
                        class="bg-info cursor-pointer"
                        title="Edit"
                        ><i class="bx bx-edit"></i
                      ></router-link>
                    </div>
                    <div class="d-flex order-actions">
                      <a
                        class="bg-danger cursor-pointer"
                        title="Delete"
                        @click="clickDel(device.kd_hardware, index)"
                        ><i class="bx bx-trash"></i
                      ></a>
                    </div>
                  </div>
                </td>
                <td align="center">
                  <div>
                    {{ device.kd_hardware }}
                  </div>
                  <div class="badge rounded bg-light-warning text-warning">
                    {{
                      !device.device_type_name
                        ? "-"
                        : device.device_type_name.toUpperCase()
                    }}
                  </div>
                </td>
                <td>{{ device.uid }}</td>
                <td align="center">{{ device.timezone }}</td>
                <td>
                  <div>
                    {{ device.nm_lokasi }}
                  </div>
                  <div class="badge rounded bg-light-warning text-warning">
                    {{ !device.nm_desa ? "-" : "Ds." + device.nm_desa }}
                    {{
                      !device.nm_kecamatan
                        ? "-"
                        : ", Kec." + device.nm_kecamatan
                    }}
                    {{
                      !device.nm_kabupaten ? "-" : ", " + device.nm_kabupaten
                    }}
                    {{
                      !device.nm_provinsi ? "-" : ", Prov." + device.nm_provinsi
                    }}
                  </div>
                </td>
                <td>{{ device.nm_instansi }}</td>
                <td align="center">
                  {{ device.is_expired == 1 ? "Yes" : "No" }}
                </td>
                <td align="center" v-if="local_storage == 'true'">
                  {{ device.enabled == 1 ? "Yes" : "No" }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="row">
            <nav aria-label="Page Navigation">
              <ul class="pagination" style="float: right">
                <li
                  v-for="page in devices.dataDevice.total_page"
                  :key="page"
                  class="page-item cursor-pointer"
                  align="right"
                  @click="searchAndPagination(page)"
                  :class="{
                    active: page === devices.dataDevice.curent_page,
                  }"
                >
                  <a class="page-link">
                    {{ page }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { deviceStore } from "../../../stores/master/device/deviceStore";
import Swal from "sweetalert2";

const devices = deviceStore();

const local_storage = ref(localStorage.is_admin);

let search = ref("");

const filter_expired = ref(0);
const filter_disabled = ref(0);
const url = ref("");

const filterExpired = (val) => {
  filter_expired.value = val;
  searchAndPagination();
};

const filterDisabled = (val) => {
  filter_disabled.value = val;
  searchAndPagination();
};

const clickDel = (id, index) => {
  Swal.fire({
    text: "Are you sure delete this data!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete("/api/v1/devices/" + id)
        .then((response) => {
          if (response.status === 200) {
            devices.dataDevice.splice(index, 1);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Deleted success",
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
};

const listDevice = (page) => {
  devices.getDevices(page);
};

const searchAndPagination = async (page) => {
  if (filter_expired.value == 0 && filter_disabled.value == 0) {
    url.value = `/api/v1/devices?page=${page}&q=${search.value}`;
  } else if (filter_expired.value == 1 && filter_disabled.value == 0) {
    url.value = `/api/v1/devices?page=${page}&q=${search.value}&expired=${filter_expired.value}`;
  } else if (filter_expired.value == 0 && filter_disabled.value == 1) {
    url.value = `/api/v1/devices?page=${page}&q=${search.value}&disabled=${filter_disabled.value}`;
  } else if (filter_expired.value == 1 && filter_disabled.value == 1) {
    url.value = `/api/v1/devices?page=${page}&q=${search.value}&expired=${filter_expired.value}&disabled=${filter_disabled.value}`;
  } else {
    url.value = `/api/v1/devices?page=${page}&q=${search.value}`;
  }
  await axios
    .get(url.value)
    .then((response) => {
      devices.dataDevice = response.data.data;
      devices.dataDevice.curent_page = response.data.meta.page;
      devices.dataDevice.total_page = response.data.meta.pages;
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(async () => {
  listDevice();
});
</script>
