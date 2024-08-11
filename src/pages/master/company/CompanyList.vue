<style>
.border-img {
  border: 1px solid #f25a37;
  border-radius: 5px;
}
</style>
<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">Master</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item active" aria-current="page">Company</li>
          </ol>
        </nav>
      </div>
    </div>
    <h6 class="mb-0 text-uppercase">Company List</h6>
    <hr />
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <div class="col-md-12 mb-3">
            <div class="row g-3">
              <div class="col-md-5">
                <button
                  class="btn btn-sm btn-warning"
                  @click="openModalCompanyAdd"
                >
                  <i class="bx bx-buildings"></i> Create
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
                <th width="30%">Name</th>
                <th width="30%">Title</th>
                <th width="20%">Logo</th>
                <th width="15%">Header</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(company, index) in companies.dataCompany"
                :key="index"
              >
                <td>
                  <div class="d-block d-md-flex justify-content-between">
                    <div class="d-flex order-actions">
                      <a
                        class="bg-info cursor-pointer"
                        title="Edit"
                        @click="openModalCompanyEdit(company.id)"
                        ><i class="bx bx-edit"></i
                      ></a>
                    </div>
                    <div class="d-flex order-actions">
                      <a
                        class="bg-danger cursor-pointer"
                        title="Delete"
                        @click="clickDel(company.id, index)"
                        ><i class="bx bx-trash"></i
                      ></a>
                    </div>
                  </div>
                </td>
                <td>{{ company.nm_instansi }}</td>
                <td>{{ company.home_title }}</td>
                <td>{{ company.home_image }}</td>
                <td align="center">
                  {{
                    company.head_bgcolor
                      ? "#" + company.head_bgcolor
                      : "Default"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="row">
            <nav aria-label="Page Navigation">
              <ul class="pagination" style="float: right">
                <li
                  v-for="page in companies.dataCompany.total_page"
                  :key="page"
                  class="page-item cursor-pointer"
                  align="right"
                  @click="searchAndPagination(page)"
                  :class="{
                    active: page === companies.dataCompany.curent_page,
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
  <!-- Modal Company Add -->
  <div
    class="modal fade modal-lg"
    id="modal_company_add"
    tabindex="-1"
    aria-labelledby="modal_company_add_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_company_add_label">
            Create Company
          </h5>
        </div>
        <form @submit.prevent="submitCreate">
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company Name"
                      v-model="form.nm_instansi"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label class="form-label">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company Title"
                      v-model="form.home_title"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Header Color</label>
                      <select
                        class="form-select"
                        v-model="select_color"
                        @change="selectColorStatus($event)"
                      >
                        <option value="default">Default</option>
                        <option value="choice">Choice</option>
                      </select>
                      <div
                        class="col-sm-12"
                        v-if="select_color_status == 'choice'"
                      >
                        <div class="row mt-2">
                          <div class="col-sm-3">
                            <input
                              type="color"
                              class="form-control"
                              placeholder="Color"
                              v-model="form.head_bgcolor"
                              style="height: 38px"
                              @input="checkColor(form.head_bgcolor)"
                            />
                          </div>
                          <div class="col-sm-9">
                            <input
                              type="text"
                              class="form-control"
                              v-model="form.head_bgcolor"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 mb-3">
                    <label class="form-label"
                      >Available Image
                      <code>[Click object to select]</code></label
                    >
                    <div class="col-sm-12 p-3">
                      <div
                        class="row p-3"
                        style="border: 1px solid #e2e0e0; border-radius: 5px"
                      >
                        <div
                          class="col-sm-3 cursor-pointer p-3"
                          :class="{
                            'border-img': image == select_image_status,
                          }"
                          v-for="(image, index) in image_list"
                          :key="index"
                          @click="selectedImage(image)"
                        >
                          <img
                            :src="`${axios.defaults.baseURL}/logo-img/${image}`"
                            width="80"
                          />
                        </div>
                      </div>
                    </div>
                    <label class="form-label">
                      <strong>
                        <span
                          class="text-success cursor-pointer"
                          @click="updateViewUpload(view_upload == 1 ? 0 : 1)"
                          v-if="view_upload == 0"
                          >Upload New Image</span
                        >
                        <span
                          class="text-success cursor-pointer"
                          @click="updateViewUpload(view_upload == 1 ? 0 : 1)"
                          v-if="view_upload == 1"
                          >Cancel Upload</span
                        >
                        or
                        <span
                          class="text-danger cursor-pointer"
                          @click="deleteImage(select_image_status)"
                          >Delete Image</span
                        >
                      </strong>
                    </label>
                  </div>
                  <div class="col-md-12 mb-3" v-if="view_upload == 1">
                    <div class="row">
                      <div class="col-sm-9">
                        <input
                          type="file"
                          id="logo"
                          class="form-control"
                          placeholder="Company Logo"
                          @change="onChangeFile"
                        />
                      </div>
                      <div class="col-sm-3">
                        <button
                          v-if="img"
                          type="button"
                          class="btn btn-primary"
                          style="width: 100%"
                          @click="uploadNewImage"
                        >
                          <i class="bx bx-upload"></i> Upload
                        </button>
                        <button
                          v-else
                          type="button"
                          class="btn btn-secondary"
                          style="width: 100%"
                        >
                          <i class="bx bx-upload"></i> Upload
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-if="img" class="mt-2">
                    <img :src="imgPreview" width="100" height="100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModalCompanyAdd"
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
  <!-- Modal Company Add -->
  <!-- Modal Company Edit -->
  <div
    class="modal fade modal-lg"
    id="modal_company_edit"
    tabindex="-1"
    aria-labelledby="modal_company_edit_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_company_edit_label">
            Edit Company
          </h5>
        </div>
        <form @submit.prevent="submitUpdate">
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company Name"
                      v-model="form.nm_instansi"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label class="form-label">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company Title"
                      v-model="form.home_title"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Header Color</label>
                      <select
                        class="form-select"
                        v-model="select_color"
                        @change="selectColorStatus($event)"
                      >
                        <option value="default">Default</option>
                        <option value="choice">Choice</option>
                      </select>
                      <div
                        class="col-sm-12"
                        v-if="select_color_status == 'choice'"
                      >
                        <div class="row mt-2">
                          <div class="col-sm-3">
                            <input
                              type="color"
                              class="form-control"
                              placeholder="Color"
                              v-model="form.head_bgcolor"
                              style="height: 38px"
                              @input="checkColor(form.head_bgcolor)"
                            />
                          </div>
                          <div class="col-sm-9">
                            <input
                              type="text"
                              class="form-control"
                              v-model="form.head_bgcolor"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 mb-3">
                    <label class="form-label"
                      >Available Image
                      <code>[Click object to select]</code></label
                    >
                    <div class="col-sm-12 p-3">
                      <div
                        class="row p-3"
                        style="border: 1px solid #e2e0e0; border-radius: 5px"
                      >
                        <div
                          class="col-sm-3 cursor-pointer p-3"
                          :class="{
                            'border-img': image == select_image_status,
                          }"
                          v-for="(image, index) in image_list"
                          :key="index"
                          @click="selectedImage(image)"
                        >
                          <img
                            :src="`${axios.defaults.baseURL}/logo-img/${image}`"
                            width="80"
                          />
                        </div>
                      </div>
                    </div>
                    <label class="form-label">
                      <strong>
                        <span
                          class="text-success cursor-pointer"
                          @click="updateViewUpload(view_upload == 1 ? 0 : 1)"
                          v-if="view_upload == 0"
                          >Upload New Image</span
                        >
                        <span
                          class="text-success cursor-pointer"
                          @click="updateViewUpload(view_upload == 1 ? 0 : 1)"
                          v-if="view_upload == 1"
                          >Cancel Upload</span
                        >
                        or
                        <span
                          class="text-danger cursor-pointer"
                          @click="deleteImage(select_image_status)"
                          >Delete Image</span
                        >
                      </strong>
                    </label>
                  </div>
                  <div class="col-md-12 mb-3" v-if="view_upload == 1">
                    <div class="row">
                      <div class="col-sm-9">
                        <input
                          type="file"
                          id="logo"
                          class="form-control"
                          placeholder="Company Logo"
                          @change="onChangeFile"
                        />
                      </div>
                      <div class="col-sm-3">
                        <button
                          v-if="img"
                          type="button"
                          class="btn btn-primary"
                          style="width: 100%"
                          @click="uploadNewImage"
                        >
                          <i class="bx bx-upload"></i> Upload
                        </button>
                        <button
                          v-else
                          type="button"
                          class="btn btn-secondary"
                          style="width: 100%"
                        >
                          <i class="bx bx-upload"></i> Upload
                        </button>
                      </div>
                    </div>
                  </div>
                  <div v-if="img" class="mt-2">
                    <img :src="imgPreview" width="100" height="100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModalCompanyEdit"
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
  <!-- Modal Company Edit -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { companyStore } from "../../../stores/master/company/companyStore";
import Swal from "sweetalert2";

const companies = companyStore();

let search = ref("");
const img = ref(null);
const imgPreview = ref(null);
const isProcess = ref(false);

const form = ref({
  nm_instansi: "",
  home_title: "",
  file: "",
  head_bgcolor: "#000000",
});

const select_color = ref("default");
const select_color_status = ref("default");

const modal_company_add = ref(null);
const modal_company_edit = ref(null);

const image_list = ref([]);

const select_image_status = ref("");

const view_upload = ref(0);

const update_id = ref("");

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
        .delete("/api/v1/instansi/" + id)
        .then((response) => {
          if (response.status === 200) {
            companies.dataCompany.splice(index, 1);
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
          console.log(error.response.data.meta.message);
          Swal.fire({
            text: error.response.data.meta.message,
            icon: "warning",
          });
        });
    }
  });
};

const listCompany = (page) => {
  companies.getCompanies(page);
};

const searchAndPagination = async (page) => {
  await axios
    .get(`/api/v1/instansi?page=${page}&q=${search.value}`)
    .then((response) => {
      companies.dataCompany = response.data.data;
      companies.dataCompany.curent_page = response.data.meta.page;
      companies.dataCompany.total_page = response.data.meta.pages;
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectColorStatus = (event) => {
  select_color_status.value = event.target.value;
};

const checkColor = (val) => {
  form.value.head_bgcolor = val;
};

const listImageLogo = async () => {
  await axios
    .get(`/api/v1/logo-images?token=${localStorage.token}`)
    .then((response) => {
      image_list.value = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const selectedImage = (value) => {
  select_image_status.value = value;
};

const updateViewUpload = (val) => {
  view_upload.value = val;
};

const onChangeFile = (event) => {
  img.value = event.target.files[0];
  let reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      imgPreview.value = reader.result;
    }.bind(this),
    false
  );
  if (img) {
    if (/\.(jpe?g|png|gif)$/i.test(img.value.name)) {
      reader.readAsDataURL(img.value);
    }
  }
};

const uploadNewImage = async () => {
  const formData = new FormData();
  formData.append("attachment", img.value);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  await axios
    .post(`/api/v1/logo-images?token=${localStorage.token}`, formData, config)
    .then((response) => {
      if (response.status == 200) {
        Swal.fire({
          position: "top-middle",
          icon: "success",
          title: "Image has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
        listImageLogo();
        img.value = null;
      }
    })
    .catch((error) => {
      Swal.fire({
        text: error.response.data.meta.message,
        icon: "warning",
      });
    });
};

const deleteImage = (val) => {
  if (val == "") {
    Swal.fire({
      text: "Nothing image selected",
      icon: "warning",
    });
  } else {
    Swal.fire({
      text: "Are you sure deleted this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete("/api/v1/logo-images/" + val)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Image has been delete",
                showConfirmButton: false,
                timer: 1000,
              });
              listImageLogo();
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
  }
};

const submitCreate = async () => {
  isProcess.value = true;
  await axios
    .post("/api/v1/instansi", {
      nm_instansi: form.value.nm_instansi,
      home_title: form.value.home_title,
      home_image: select_image_status.value,
      head_bgcolor: form.value.head_bgcolor.replace("#", ""),
    })
    .then((response) => {
      if (response.status === 200) {
        isProcess.value = false;
        closeModalCompanyAdd();
        Swal.fire({
          position: "center",
          icon: "success",
          text: "create company is successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        listCompany();
        form.value.nm_instansi = "";
        form.value.home_title = "";
        select_image_status.value = "";
        form.value.head_bgcolor = "";

        view_upload.value = 0;
        form.value.file = "";
        select_color.value = "default";
        select_color_status.value = "default";
        select_image_status.value = "";
        view_upload.value = 0;
      }
    })
    .catch((error) => {
      console.log(error);
      isProcess.value = false;
    });
};

const loadCompany = async (id) => {
  await axios
    .get(`/api/v1/instansi/${id}`)
    .then((response) => {
      update_id.value = id;
      form.value.nm_instansi = response.data.data.nm_instansi;
      form.value.home_title = response.data.data.home_title;
      form.value.home_image = response.data.data.home_image;
      form.value.head_bgcolor =
        response.data.data.head_bgcolor == null ||
        response.data.data.head_bgcolor == ""
          ? ""
          : "#" + response.data.data.head_bgcolor;
      select_color.value =
        response.data.data.head_bgcolor == null ||
        response.data.data.head_bgcolor == ""
          ? "default"
          : "choice";
      select_color_status.value =
        response.data.data.head_bgcolor == null ||
        response.data.data.head_bgcolor == ""
          ? "default"
          : "choice";
      select_image_status.value = response.data.data.home_image;
    })
    .catch((error) => {
      console.log(error);
    });
};

const submitUpdate = async () => {
  isProcess.value = true;
  await axios
    .patch(`/api/v1/instansi/${update_id.value}`, {
      nm_instansi: form.value.nm_instansi,
      home_title: form.value.home_title,
      home_image: select_image_status.value,
      head_bgcolor: form.value.head_bgcolor.replace("#", ""),
    })
    .then((response) => {
      if (response.status === 200) {
        isProcess.value = false;
        closeModalCompanyEdit();
        listCompany();
        Swal.fire({
          position: "center",
          icon: "success",
          text: "Update company is successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        form.value.nm_instansi = "";
        form.value.home_title = "";
        select_image_status.value = "";
        form.value.head_bgcolor = "";

        view_upload.value = 0;
        form.value.file = "";
        select_color.value = "default";
        select_color_status.value = "default";
        select_image_status.value = "";
        view_upload.value = 0;
      }
    })
    .catch((error) => {
      console.log(error);
      isProcess.value = false;
    });
};

onMounted(async () => {
  listCompany();
  modal_company_add.value = new bootstrap.Modal("#modal_company_add", {
    backdrop: "static",
    keyboard: false,
  });
  modal_company_edit.value = new bootstrap.Modal("#modal_company_edit", {
    backdrop: "static",
    keyboard: false,
  });
});

function openModalCompanyAdd() {
  listImageLogo();
  modal_company_add.value.show();
}

function closeModalCompanyAdd() {
  view_upload.value = 0;
  modal_company_add.value.hide();
}

function openModalCompanyEdit(id) {
  loadCompany(id);
  listImageLogo();
  modal_company_edit.value.show();
}

function closeModalCompanyEdit() {
  modal_company_edit.value.hide();
}
</script>
