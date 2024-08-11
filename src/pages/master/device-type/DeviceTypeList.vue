<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">Master</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item" aria-current="page">Device</li>
            <li class="breadcrumb-item active" aria-current="page">
              Device Type
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <h6 class="mb-0 text-uppercase">Device Type List</h6>
    <hr />
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <div class="col-md-12 mb-3">
            <div class="row g-3">
              <div class="col-md-5">
                <button
                  class="btn btn-sm btn-warning"
                  @click="openModalDeviceTypeAdd"
                >
                  <i class="bx bx-mobile"></i> Create
                </button>
              </div>
              <div class="col-md-4 text-end"></div>
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
                <th width="10%">ID</th>
                <th width="85%">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(devicetype, index) in devicetypes.dataDeviceType"
                :key="index"
              >
                <td>
                  <div class="d-block d-md-flex justify-content-between">
                    <div class="d-flex order-actions">
                      <a
                        class="bg-info cursor-pointer"
                        title="Edit"
                        @click="
                          openModalDeviceTypeEdit(devicetype.device_type_id)
                        "
                        ><i class="bx bx-edit"></i
                      ></a>
                    </div>
                    <div class="d-flex order-actions">
                      <a
                        class="bg-danger cursor-pointer"
                        title="Delete"
                        @click="clickDel(devicetype.device_type_id, index)"
                        ><i class="bx bx-trash"></i
                      ></a>
                    </div>
                  </div>
                </td>
                <td align="center">{{ devicetype.device_type_id }}</td>
                <td>{{ devicetype.device_type_name }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="row">
            <nav aria-label="Page Navigation">
              <ul class="pagination" style="float: right">
                <li
                  v-for="page in devicetypes.dataDeviceType.total_page"
                  :key="page"
                  class="page-item cursor-pointer"
                  align="right"
                  @click="searchAndPagination(page)"
                  :class="{
                    active: page === devicetypes.dataDeviceType.curent_page,
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
  <!-- Modal Device Type Add -->
  <div
    class="modal fade modal-lg"
    id="modal_device_type_add"
    tabindex="-1"
    aria-labelledby="modal_device_type_add_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_device_type_add_label">
            Create Device Type
          </h5>
        </div>
        <form @submit.prevent="submitCreate">
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="new_device_type_id" class="form-label"
                      >ID</label
                    >
                    <input
                      id="new_device_type_id"
                      type="text"
                      class="form-control"
                      v-model="form_new.device_type_id"
                      placeholder="Device Type ID"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="new_device_type_name" class="form-label"
                      >Name</label
                    >
                    <input
                      id="new_device_type_name"
                      type="text"
                      class="form-control"
                      v-model="form_new.device_type_name"
                      placeholder="Device Type Name"
                      tabindex="-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModalDeviceTypeAdd"
            >
              <i class="bx bx-x-circle"></i> Close
            </button>
            <button v-if="!isProcess" type="submit" class="btn btn-warning">
              <i class="bx bx-save"></i> Save
            </button>
            <button
              v-if="isProcess"
              type="button"
              class="btn btn-secondary"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal Device Type Add -->
  <!-- Modal Device Type Edit -->
  <div
    class="modal fade modal-lg"
    id="modal_device_type_edit"
    tabindex="-1"
    aria-labelledby="modal_device_type_edit_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_device_type_edit_label">
            Edit Device Type
          </h5>
        </div>
        <form @submit.prevent="submitUpdate">
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="edit_device_type_id" class="form-label"
                      >ID</label
                    >
                    <input
                      id="edit_device_type_id"
                      type="text"
                      class="form-control"
                      v-model="form_edit.device_type_id"
                      placeholder="Device Type ID"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="edit_device_type_name" class="form-label"
                      >Name</label
                    >
                    <input
                      id="edit_device_type_name"
                      type="text"
                      class="form-control"
                      v-model="form_edit.device_type_name"
                      placeholder="Device Type Name"
                      tabindex="-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModalDeviceTypeEdit"
            >
              <i class="bx bx-x-circle"></i> Close
            </button>
            <button v-if="!isProcess" type="submit" class="btn btn-warning">
              <i class="bx bx-save"></i> Update
            </button>
            <button
              v-if="isProcess"
              type="button"
              class="btn btn-secondary"
              disabled
            >
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal Device Type Edit -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { devicetypeStore } from "../../../stores/master/device-type/deviceTypeStore";
import Swal from "sweetalert2";

const devicetypes = devicetypeStore();

let search = ref("");
const isProcess = ref(false);
const form_new = ref({
  device_type_id: "",
  device_type_name: "",
});
const form_edit = ref({
  id: "",
  device_type_id: "",
  device_type_name: "",
});

const modal_device_type_add = ref(null);
const modal_device_type_edit = ref(null);

const listDeviceType = (page) => {
  devicetypes.getDeviceTypes(page);
};

const detailDeviceType = async (id) => {
  const response = await axios.get(`/api/v1/device-types/${id}`);
  form_edit.value.id = response.data.data.device_type_id;
  form_edit.value.device_type_id = response.data.data.device_type_id;
  form_edit.value.device_type_name = response.data.data.device_type_name;
  console.log(response);
};

const searchAndPagination = async (page) => {
  await axios
    .get(`/api/v1/device-types?page=${page}&q=${search.value}`)
    .then((response) => {
      devicetypes.dataDeviceType = response.data.data;
      devicetypes.dataDeviceType.curent_page = response.data.meta.page;
      devicetypes.dataDeviceType.total_page = response.data.meta.pages;
    })
    .catch((error) => {
      console.log(error);
    });
};
const submitCreate = async () => {
  isProcess.value = true;
  await axios
    .post("/api/v1/device-types", {
      device_type_id: form_new.value.device_type_id,
      device_type_name: form_new.value.device_type_name,
    })
    .then((response) => {
      if (response.status === 200) {
        isProcess.value = false;
        closeModalDeviceTypeAdd();
        Swal.fire({
          position: "center",
          icon: "success",
          text: "create device type is successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        listDeviceType();
        form_new.value.device_type_id = "";
        form_new.value.device_type_name = "";
      }
    })
    .catch((error) => {
      isProcess.value = false;
      if (error.response) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: error.response.data.meta.message,
        });
      }
    });
};

const submitUpdate = async () => {
  isProcess.value = true;
  await axios
    .patch(`/api/v1/device-types/${form_edit.value.id}`, {
      device_type_id: form_edit.value.device_type_id,
      device_type_name: form_edit.value.device_type_name,
    })
    .then((response) => {
      if (response.status === 200) {
        isProcess.value = false;
        closeModalDeviceTypeEdit();
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Update device type is successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        listDeviceType();
        form_edit.value.device_type_id = "";
        form_edit.value.device_type_name = "";
      }
    })
    .catch((error) => {
      isProcess.value = false;
      if (error.response) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: error.response.data.meta.message,
        });
      }
    });
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
        .delete("/api/v1/device-types/" + id)
        .then((response) => {
          if (response.status === 200) {
            devicetypes.dataDeviceType.splice(index, 1);
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

onMounted(async () => {
  listDeviceType();
  modal_device_type_add.value = new bootstrap.Modal("#modal_device_type_add", {
    backdrop: "static",
    keyboard: false,
  });
  modal_device_type_edit.value = new bootstrap.Modal(
    "#modal_device_type_edit",
    {
      backdrop: "static",
      keyboard: false,
    }
  );
});

function openModalDeviceTypeAdd() {
  modal_device_type_add.value.show();
}

function closeModalDeviceTypeAdd() {
  modal_device_type_add.value.hide();
}

function openModalDeviceTypeEdit(id) {
  detailDeviceType(id);
  modal_device_type_edit.value.show();
}

function closeModalDeviceTypeEdit() {
  modal_device_type_edit.value.hide();
}
</script>
