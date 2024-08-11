<script setup>
import Sidebar from '../components/layouts/Sidebar.vue';
import Navbar from '../components/layouts/Navbar.vue';
import Footer from '../components/layouts/Footer.vue';
// import Dashboard from './pages/Dashboard.vue';
</script>

<template>
  <div class="wrapper">
    <!--sidebar wrapper -->
    <Sidebar/>
    <!--end sidebar wrapper -->
    <!--start header -->
    <Navbar/>
    <!--end header -->
    <!--start page wrapper -->
    <div class="page-wrapper">
      <!-- <Dashboard/> -->
      <router-view></router-view>
    </div>
    <!--end page wrapper -->
    <!--start overlay-->
    <div class="overlay toggle-icon"></div>
    <!--end overlay-->
    <!--Start Back To Top Button-->
    <a href="javaScript:;" class="back-to-top" style="z-index:1200"
      ><i class="bx bxs-up-arrow-alt"></i
    ></a>
    <!--End Back To Top Button-->
    <Footer/>
  </div>
</template>
