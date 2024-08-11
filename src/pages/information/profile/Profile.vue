<template>
  <div class="page-content">
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3">Information</div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item active" aria-current="page">Profile</li>
          </ol>
        </nav>
      </div>
    </div>
    <h6 class="mb-0 text-uppercase">Profile</h6>
    <hr />
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitUpdate">
          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">Name</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <input type="text" class="form-control" v-model="form.name" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">Email</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <input type="text" class="form-control" v-model="form.email" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">User ID</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <input type="text" class="form-control" v-model="form.user_id" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-12">
              <div class="alert alert-warning">
                If the password form is empty then the password is not changed
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">Password</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <div class="input-group">
                <input
                  v-if="showPassNew == 0"
                  type="password"
                  class="form-control"
                  v-model="form.password"
                />
                <input
                  v-else
                  type="text"
                  class="form-control"
                  v-model="form.password"
                />
                <span
                  v-if="showPassNew == 0"
                  class="input-group-text"
                  @click="clickShowPassNew(1)"
                  ><i class="bx bx-hide"></i
                ></span>
                <span
                  v-else
                  class="input-group-text"
                  @click="clickShowPassNew(0)"
                  ><i class="bx bx-show"></i
                ></span>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-3">
              <h6 class="mb-0">Password Confirmation</h6>
            </div>
            <div class="col-sm-9 text-secondary">
              <div class="input-group">
                <input
                  v-if="showPassConfirm == 0"
                  type="password"
                  class="form-control"
                  v-model="form.password_confirmation"
                />
                <input
                  v-else
                  type="text"
                  class="form-control"
                  v-model="form.password_confirmation"
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
          <div class="row mb-3">
            <div class="col-sm-3"></div>
            <div class="col-sm-9 text-secondary">
              <button type="submit" class="btn btn-warning" v-if="!isProcess">
                <i class="bx bx-save"></i> Save
              </button>
              <button
                v-if="isProcess == true"
                type="button"
                class="btn btn-warning"
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const isProcess = ref(false);
const form = ref({
  name: "",
  email: "",
  user_id: "",
  password: "",
  password_confirmation: "",
});

const showPassNew = ref(0);
const clickShowPassNew = (val) => {
  showPassNew.value = val;
};
const showPassConfirm = ref(0);
const clickShowPassConfirm = (val) => {
  showPassConfirm.value = val;
};

const submitUpdate = async () => {
  isProcess.value = true;
  if (form.value.password_confirmation != form.value.password) {
    isProcess.value = false;
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Password Confirmation do not match!",
    });
  } else {
    const data = {
      nm_user: form.value.name,
      user_id: form.value.user_id,
    };

    if (form.value.password) {
      data.email = form.value.email;
    }

    if (form.value.password) {
      data.password = form.value.password;
    }

    await axios
      .patch(`/api/v1/users/${form.value.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          isProcess.value = false;
          Swal.fire({
            position: "center",
            icon: "success",
            text: "Update profile is successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          localStorage.setItem("user_name", data.nm_user);
          localStorage.setItem("user_id", data.user_id.toString());
          document.location.href = "/profile";
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

onMounted(async () => {
  await axios
    .get(`/api/v1/users/${localStorage.user_id}`)
    .then((response) => {
      form.value.id = response.data.data.id;
      form.value.name = response.data.data.nm_user;
      form.value.email = response.data.data.email;
      form.value.user_id = response.data.data.user_id;
    })
    .catch((error) => {
      console.log(error);
    });
});

onMounted(() => {});
</script>
