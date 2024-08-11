<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">Master</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item active" aria-current="page">User</li>
          </ol>
        </nav>
      </div>
    </div>
    <h6 class="mb-0 text-uppercase">User List</h6>
    <hr />
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <div class="col-md-12 mb-3">
            <div class="row g-3">
              <div class="col-md-5">
                <button
                  class="btn btn-sm btn-warning"
                  @click="openModalUserAdd"
                >
                  <i class="bx bx-id-card"></i> Create
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
                <th width="30%">Company</th>
                <th width="20%">Email</th>
                <th width="15%">User ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users.dataUser" :key="index">
                <td>
                  <div class="d-block d-md-flex justify-content-between">
                    <div class="d-flex order-actions">
                      <a
                        class="bg-info cursor-pointer"
                        title="Edit"
                        @click="openModalUserEdit(user.id)"
                        ><i class="bx bx-edit"></i
                      ></a>
                    </div>
                    <div class="d-flex order-actions">
                      <a
                        class="bg-danger cursor-pointer"
                        title="Delete"
                        @click="clickDel(user.id, index)"
                        ><i class="bx bx-trash"></i
                      ></a>
                    </div>
                  </div>
                </td>
                <td>{{ user.nm_user }}</td>
                <td>{{ user.nm_instansi }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.user_id }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="row">
            <nav aria-label="Page Navigation">
              <ul class="pagination" style="float: right">
                <li
                  v-for="page in users.dataUser.total_page"
                  :key="page"
                  class="page-item cursor-pointer"
                  align="right"
                  @click="searchAndPagination(page)"
                  :class="{
                    active: page === users.dataUser.curent_page,
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
  <!-- Modal User Add -->
  <div
    class="modal fade modal-lg"
    id="modal_user_add"
    tabindex="-1"
    aria-labelledby="modal_user_add_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_user_add_label">Create User</h5>
        </div>
        <form @submit.prevent="submitCreate">
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="new_nm_user" class="form-label"
                      >Full Name</label
                    >
                    <input
                      id="new_nm_user"
                      type="text"
                      class="form-control"
                      v-model="form_new.nm_user"
                      placeholder="Full Name"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="new_instansi_id" class="form-label"
                      >Company</label
                    >
                    <select
                      id="new_instansi_id"
                      v-model="form_new.instansi_id"
                      class="form-select form-select-sm"
                      tabindex="-1"
                    >
                      <option v-for="v in data_company" :value="v.id">
                        {{ v.text }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                      id="email"
                      type="email"
                      class="form-control"
                      v-model="form_new.email"
                      placeholder="Email"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="new_user_id" class="form-label">User ID</label>
                    <input
                      id="new_user_id"
                      type="text"
                      class="form-control"
                      v-model="form_new.user_id"
                      placeholder="User ID"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="new_password" class="form-label"
                      >Password</label
                    >
                    <div class="input-group">
                      <input
                        id="new_password"
                        v-if="showPass == 0"
                        type="password"
                        class="form-control"
                        v-model="form_new.password"
                        tabindex="-1"
                      />
                      <input
                        v-else
                        id="new_password"
                        type="text"
                        class="form-control"
                        v-model="form_new.password"
                        tabindex="-1"
                      />
                      <span
                        v-if="showPass == 0"
                        class="input-group-text"
                        @click="clickShowPass(1)"
                        ><i class="bx bx-hide"></i
                      ></span>
                      <span
                        v-else
                        class="input-group-text"
                        @click="clickShowPass(0)"
                        ><i class="bx bx-show"></i
                      ></span>
                    </div>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="new_password_confirmation" class="form-label"
                      >Password Confirmation</label
                    >
                    <div class="input-group">
                      <input
                        v-if="showPassConfirm == 0"
                        id="new_password_confirmation"
                        type="password"
                        class="form-control"
                        v-model="form_new.password_confirmation"
                        tabindex="-1"
                      />
                      <input
                        v-else
                        id="new_password_confirmation"
                        type="text"
                        class="form-control"
                        v-model="form_new.password_confirmation"
                        tabindex="-1"
                      />
                      <span
                        v-if="showPassConfirm == 0"
                        class="input-group-text"
                        @click="clickShowPassConfirm(1)"
                        ><i class="bx bx-hide"></i
                      ></span>
                      <span
                        v-else
                        class="input-group-text"
                        @click="clickShowPassConfirm(0)"
                        ><i class="bx bx-show"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModalUserAdd"
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
  <!-- Modal User Add -->
  <!-- Modal User Edit -->
  <div
    class="modal fade modal-lg"
    id="modal_user_edit"
    tabindex="-1"
    aria-labelledby="modal_user_edit_label"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modal_user_edit_label">Edit User</h5>
        </div>
        <form @submit.prevent="submitUpdate">
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 mb-3">
                    <label for="edit_nm_user" class="form-label"
                      >Full Name</label
                    >
                    <input
                      id="edit_nm_user"
                      type="text"
                      class="form-control"
                      v-model="form_edit.nm_user"
                      placeholder="Full Name"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="edit_instansi_id" class="form-label"
                      >Company</label
                    >
                    <select
                      id="edit_instansi_id"
                      v-model="form_edit.instansi_id"
                      class="form-select form-select-sm"
                      tabindex="-1"
                    >
                      <option v-for="v in data_company" :value="v.id">
                        {{ v.text }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="edit_email" class="form-label">Email</label>
                    <input
                      id="edit_email"
                      type="email"
                      class="form-control"
                      v-model="form_edit.email"
                      placeholder="Email"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="edit_user_id" class="form-label">User ID</label>
                    <input
                      id="edit_user_id"
                      type="text"
                      class="form-control"
                      v-model="form_edit.user_id"
                      placeholder="User ID"
                      tabindex="-1"
                    />
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="edit_password" class="form-label"
                      >Password</label
                    >
                    <div class="input-group">
                      <input
                        id="edit_password"
                        v-if="showPass == 0"
                        type="password"
                        class="form-control"
                        v-model="form_edit.password"
                        tabindex="-1"
                      />
                      <input
                        v-else
                        id="edit_password"
                        type="text"
                        class="form-control"
                        v-model="form_edit.password"
                        tabindex="-1"
                      />
                      <span
                        v-if="showPass == 0"
                        class="input-group-text"
                        @click="clickShowPass(1)"
                        ><i class="bx bx-hide"></i
                      ></span>
                      <span
                        v-else
                        class="input-group-text"
                        @click="clickShowPass(0)"
                        ><i class="bx bx-show"></i
                      ></span>
                    </div>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="edit_password_confirmation" class="form-label"
                      >Password Confirmation</label
                    >
                    <div class="input-group">
                      <input
                        v-if="showPassConfirm == 0"
                        id="edit_password_confirmation"
                        type="password"
                        class="form-control"
                        v-model="form_edit.password_confirmation"
                        tabindex="-1"
                      />
                      <input
                        v-else
                        id="edit_password_confirmation"
                        type="text"
                        class="form-control"
                        v-model="form_edit.password_confirmation"
                        tabindex="-1"
                      />
                      <span
                        v-if="showPassConfirm == 0"
                        class="input-group-text"
                        @click="clickShowPassConfirm(1)"
                        ><i class="bx bx-hide"></i
                      ></span>
                      <span
                        v-else
                        class="input-group-text"
                        @click="clickShowPassConfirm(0)"
                        ><i class="bx bx-show"></i
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModalUserEdit"
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
  <!-- Modal User Edit -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { userStore } from "../../../stores/master/user/userStore";
import Swal from "sweetalert2";
import select2 from "select2";

select2();

const users = userStore();
let search = ref("");
const isProcess = ref(false);
const form_new = ref({
  nm_user: "",
  instansi_id: "",
  email: "",
  user_id: "",
  password: "",
  password_confirmation: "",
});
const form_edit = ref({
  id: "",
  nm_user: "",
  instansi_id: "",
  email: "",
  user_id: "",
  password: "",
  password_confirmation: "",
});
const company = ref([]);
const data_company = ref([]);

const modal_user_add = ref(null);
const modal_user_edit = ref(null);

const showPass = ref(0);
const clickShowPass = (val) => {
  showPass.value = val;
};
const showPassConfirm = ref(0);
const clickShowPassConfirm = (val) => {
  showPassConfirm.value = val;
};

const listUser = (page) => {
  users.getUsers(page);
};

const listLookupCompany = async () => {
  const response = await axios.get("/api/v1/instansi");
  company.value = response.data.data;
  data_company.value = company.value.map((item) => ({
    id: item.id,
    text: item.nm_instansi,
  }));
};

const detailUser = async (id) => {
  const response = await axios.get(`/api/v1/users/${id}`);
  form_edit.value.id = response.data.data.id;
  form_edit.value.nm_user = response.data.data.nm_user;
  form_edit.value.instansi_id = response.data.data.instansi_id;
  form_edit.value.email = response.data.data.email;
  form_edit.value.user_id = response.data.data.user_id;
  console.log(response);
};

const searchAndPagination = async (page) => {
  await axios
    .get(`/api/v1/users?page=${page}&q=${search.value}`)
    .then((response) => {
      users.dataUser = response.data.data;
      users.dataUser.curent_page = response.data.meta.page;
      users.dataUser.total_page = response.data.meta.pages;
    })
    .catch((error) => {
      console.log(error);
    });
};

const submitCreate = async () => {
  isProcess.value = true;
  if (form_new.value.password_confirmation != form_new.value.password) {
    isProcess.value = false;
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Password Confirmation do not match!",
    });
  } else {
    await axios
      .post("/api/v1/users", {
        nm_user: form_new.value.nm_user,
        instansi_id: form_new.value.instansi_id,
        email: form_new.value.email,
        user_id: form_new.value.user_id,
        password: form_new.value.password,
      })
      .then((response) => {
        if (response.status === 200) {
          isProcess.value = false;
          closeModalUserAdd();
          Swal.fire({
            position: "center",
            icon: "success",
            text: "create company is successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          listUser();
          form_new.value.nm_user = "";
          form_new.value.instansi_id = "";
          form_new.value.email = "";
          form_new.value.user_id = "";
          form_new.value.password = "";
          form_new.value.password_confirmation = "";
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
  }
};

const submitUpdate = async () => {
  isProcess.value = true;
  if (form_edit.value.password_confirmation != form_edit.value.password) {
    isProcess.value = false;
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Password Confirmation do not match!",
    });
  } else {
    const data = {
      nm_user: form_edit.value.nm_user,
      instansi_id: form_edit.value.instansi_id,
      email: form_edit.value.email,
      user_id: form_edit.value.user_id,
    };

    if (form_edit.value.password) {
      data.password = form_edit.value.password;
    }

    await axios
      .patch(`/api/v1/users/${form_edit.value.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          isProcess.value = false;
          closeModalUserEdit();
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Update user is successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          listUser();
          form_edit.value.nm_user = "";
          form_edit.value.instansi_id = "";
          form_edit.value.email = "";
          form_edit.value.user_id = "";
          form_edit.value.password = "";
          form_edit.value.password_confirmation = "";
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
  }
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
        .delete("/api/v1/users/" + id)
        .then((response) => {
          if (response.status === 200) {
            users.dataUser.splice(index, 1);
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
  listLookupCompany();
  listUser();
  modal_user_add.value = new bootstrap.Modal("#modal_user_add", {
    backdrop: "static",
    keyboard: false,
  });
  modal_user_edit.value = new bootstrap.Modal("#modal_user_edit", {
    backdrop: "static",
    keyboard: false,
  });
});

function openModalUserAdd() {
  listLookupCompany();
  modal_user_add.value.show();
}

function closeModalUserAdd() {
  modal_user_add.value.hide();
}

function openModalUserEdit(id) {
  detailUser(id);
  modal_user_edit.value.show();
}

function closeModalUserEdit() {
  modal_user_edit.value.hide();
}
</script>
