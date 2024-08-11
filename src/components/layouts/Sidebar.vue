<style>
.section::-webkit-scrollbar {
  width: 10px;
}
.section::-webkit-scrollbar-track {
  background-color: #3bbcfe;
  border: none;
}
.section::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(30, 15, 154, 0.8);
  border-radius: 3px;
}
</style>
<template>
  <div
    class="sidebar-wrapper section"
    data-simplebar="true"
    style="overflow-y: auto; overflow-x: hidden; z-index: 1200"
  >
    <div class="sidebar-header">
      <div>
        <img
          src="/assets/images/logo/logo_mpn_notext.png"
          class="logo-iconxxx"
          alt="logo icon"
          width="30"
        />
      </div>
      <div>
        <h4 class="logo-text">PT. MPN</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-back"></i></div>
    </div>
    <ul class="metismenu" id="menu">
      <li>
        <router-link to="/">
          <div class="parent-icon"><i class="bx bx-world"></i></div>
          <div class="menu-title">Dashboard</div>
        </router-link>
      </li>
      <li class="menu-label">MASTER</li>
      <li v-if="access_admin == 'true'">
        <router-link to="/company">
          <div class="parent-icon"><i class="bx bx-buildings"></i></div>
          <div class="menu-title">Company</div>
        </router-link>
      </li>
      <li v-if="access_admin == 'true'">
        <router-link to="/user">
          <div class="parent-icon"><i class="bx bx-id-card"></i></div>
          <div class="menu-title">User</div>
        </router-link>
      </li>
      <li>
        <a class="has-arrow" href="javascript:;">
          <div class="parent-icon"><i class="bx bx-mobile"></i></div>
          <div class="menu-title">Device</div>
        </a>
        <ul>
          <li v-if="access_admin == 'true'">
            <router-link to="/device-type"
              ><i class="bx bx-radio-circle"></i>Device Type</router-link
            >
          </li>
          <li>
            <router-link to="/device"
              ><i class="bx bx-radio-circle"></i>Device</router-link
            >
          </li>
        </ul>
      </li>
      <li class="menu-label">Information</li>
      <li>
        <router-link to="/profile">
          <div class="parent-icon"><i class="bx bx-user-circle"></i></div>
          <div class="menu-title">Profile</div>
        </router-link>
      </li>
      <li class="menu-label">&nbsp;</li>
      <li>
        <router-link to="#">
          <div class="parent-icon"><i class="bx bx-log-out-circle"></i></div>
          <div class="menu-title" @click="userLogout">Logout</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const access_admin = ref("false");

const isAccess = () => {
  access_admin.value = localStorage.is_admin;
};

const userLogout = async () => {
  await axios
    .post(`/api/v1/logout`)
    .then((response) => {
      document.location.href = "/login";
      localStorage.clear();
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  isAccess();
});

$(function () {
  "use strict";
  new PerfectScrollbar(".app-container"),
    $(".mobile-search-icon").on("click", function () {
      $(".search-bar").addClass("full-search-bar");
    }),
    $(".search-close").on("click", function () {
      $(".search-bar").removeClass("full-search-bar");
    }),
    $(".mobile-toggle-menu").on("click", function () {
      $(".wrapper").addClass("toggled");
    }),
    $(".dark-mode").on("click", function () {
      if ($(".dark-mode-icon i").attr("class") == "bx bx-sun") {
        $(".dark-mode-icon i").attr("class", "bx bx-moon");
        $("html").attr("class", "light-theme");
      } else {
        $(".dark-mode-icon i").attr("class", "bx bx-sun");
        $("html").attr("class", "dark-theme");
      }
    }),
    $(".toggle-icon").click(function () {
      $(".wrapper").hasClass("toggled")
        ? ($(".wrapper").removeClass("toggled"),
          $(".sidebar-wrapper").unbind("hover"))
        : ($(".wrapper").addClass("toggled"),
          $(".sidebar-wrapper").hover(
            function () {
              $(".wrapper").addClass("sidebar-hovered");
            },
            function () {
              $(".wrapper").removeClass("sidebar-hovered");
            }
          ));
    }),
    $(document).ready(function () {
      $(window).on("scroll", function () {
        $(this).scrollTop() > 300
          ? $(".back-to-top").fadeIn()
          : $(".back-to-top").fadeOut();
      }),
        $(".back-to-top").on("click", function () {
          return (
            $("html, body").animate(
              {
                scrollTop: 0,
              },
              600
            ),
            !1
          );
        });
    }),
    $(function () {
      for (
        var e = window.location,
          o = $(".metismenu li a")
            .filter(function () {
              return this.href == e;
            })
            .addClass("")
            .parent()
            .addClass("mm-active");
        o.is("li");

      )
        o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
    }),
    $(function () {
      $("#menu").metisMenu();
    }),
    $(".chat-toggle-btn").on("click", function () {
      $(".chat-wrapper").toggleClass("chat-toggled");
    }),
    $(".chat-toggle-btn-mobile").on("click", function () {
      $(".chat-wrapper").removeClass("chat-toggled");
    }),
    $(".email-toggle-btn").on("click", function () {
      $(".email-wrapper").toggleClass("email-toggled");
    }),
    $(".email-toggle-btn-mobile").on("click", function () {
      $(".email-wrapper").removeClass("email-toggled");
    }),
    $(".compose-mail-btn").on("click", function () {
      $(".compose-mail-popup").show();
    }),
    $(".compose-mail-close").on("click", function () {
      $(".compose-mail-popup").hide();
    }),
    $(".switcher-btn").on("click", function () {
      $(".switcher-wrapper").toggleClass("switcher-toggled");
    }),
    $(".close-switcher").on("click", function () {
      $(".switcher-wrapper").removeClass("switcher-toggled");
    }),
    $("#lightmode").on("click", function () {
      $("html").attr("class", "light-theme");
    }),
    $("#darkmode").on("click", function () {
      $("html").attr("class", "dark-theme");
    }),
    $("#semidark").on("click", function () {
      $("html").attr("class", "semi-dark");
    }),
    $("#minimaltheme").on("click", function () {
      $("html").attr("class", "minimal-theme");
    });
});
</script>
