<template>
  <div class="wrapper">
    <div class="section-authentication-cover">
      <div class="">
        <div class="row g-0">
          <div
            class="col-12 col-xl-7 col-xxl-8 auth-cover-left bg-gradient-cosmic align-items-center justify-content-center d-none d-xl-flex"
          >
            <div
              class="card shadow-none bg-transparent shadow-none rounded-0 mb-0"
            >
              <div class="card-body">
                <img
                  src="/assets/images/logo/logo_mpn_backwards.png"
                  class="img-fluid auth-img-cover-login"
                  width="650"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div
            class="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center"
          >
            <div class="card rounded-0 m-3 shadow-none bg-transparent mb-0">
              <div class="card-body p-sm-5">
                <div class="">
                  <div class="mb-3 text-center">
                    <img
                      src="/assets/images/logo/logo_mpn_notext.png"
                      width="60"
                      alt=""
                    />
                  </div>
                  <div class="text-center mb-4">
                    <h5 class="">Admin Login</h5>
                    <p class="mb-0">
                      Enter your credential account in the form below
                    </p>
                  </div>
                  <div class="form-body">
                    <form class="row g-3" @submit.prevent="submitLogin">
                      <div class="col-12">
                        <label for="user_id" class="form-label">User ID</label>
                        <input
                          type="user_id"
                          class="form-control"
                          id="user_id"
                          placeholder="User ID"
                          v-model="form.user_id"
                        />
                      </div>
                      <div class="col-12">
                        <label for="inputChoosePassword" class="form-label"
                          >Password</label
                        >
                        <div class="input-group">
                          <input
                            v-if="showPass == 0"
                            type="password"
                            class="form-control"
                            id="inputChoosePassword"
                            placeholder="Password"
                            v-model="form.password"
                            required
                          />
                          <input
                            v-else
                            type="text"
                            class="form-control"
                            id="inputChoosePassword"
                            placeholder="Password"
                            v-model="form.password"
                            required
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

                      <div class="col-md-6">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            v-model="form.remember"
                          />
                          <label
                            class="form-check-label"
                            for="flexSwitchCheckChecked"
                            >Remember me</label
                          >
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div class="text-danger">
                          <i>{{ !errMessage ? "" : "*" + errMessage }}</i>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="d-grid">
                          <button
                            v-if="isProcess == false"
                            type="submit"
                            class="btn btn-warning"
                          >
                            Login
                          </button>
                          <button
                            v-if="isProcess == true"
                            type="button"
                            class="btn btn-primary"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({
  user_id: "",
  password: "",
  remember: 0,
});

const errMessage = ref("");
const isProcess = ref(false);

const showPass = ref(0);
const clickShowPass = (val) => {
  showPass.value = val;
};

const submitLogin = async () => {
  isProcess.value = true;
  await axios
    .post("/api/v1/login", {
      user_id: form.value.user_id,
      password: form.value.password,
      remember: form.value.remember === true ? 1 : 0,
    })
    .then((response) => {
      const {
        app_title,
        id_instansi,
        is_admin,
        logo_left,
        token,
        user_id,
        user_name,
        email,
        nm_instansi,
      } = response.data.data;
      localStorage.setItem("app_title", app_title);
      localStorage.setItem("id_instansi", id_instansi.toString());
      localStorage.setItem("is_admin", is_admin.toString());
      localStorage.setItem("logo_left", logo_left);
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id.toString());
      localStorage.setItem("user_name", user_name.toString());
      localStorage.setItem("email", email.toString());
      localStorage.setItem("nm_instansi", nm_instansi);
      document.location.href = "/";
    })
    .catch((error) => {
      isProcess.value = false;
      console.log(error);
    });
};
</script>
