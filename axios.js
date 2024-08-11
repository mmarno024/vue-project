import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = false;
axios.defaults.baseURL = "http://localhost:8080";

const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
} else {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = false;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (
      response.data.meta.message == "Session expired" &&
      response.data.meta.success === false
    ) {
      handleSessionExpiration();
    }
    return Promise.reject(error);
  }
);

function handleSessionExpiration() {
  localStorage.clear();
  router.push("/login");
}
