<template>
  <div class="wrapper">
      
    <top-navbar class="top-navbar">
    </top-navbar>

    <side-bar class="side-bar">
    </side-bar>

    <div class="main-panel">
      
      <dashboard-content class="dashboard"></dashboard-content>

    </div>
  </div>
</template>

<style>
  .main-panel{
    width: calc(100% - 73px);
    background-color: white;
    pointer-events: all;
    overflow-y: auto;
    margin-bottom: 10px;
    z-index: -2;
  }

  .wrapper{
    height: 100vh;
  }

  .main-panel > .content{
    padding: 30px 5px 30px 5px;
  }

  @media (max-width: 992px){
    .main-panel{
      width: 100%
    }
  }

</style>

<script>
  import TopNavbar from './TopNavbar.vue'
  import DashboardContent from './Content.vue'
  
  export default {
    components: {
      TopNavbar,
      DashboardContent,
    }
  }

</script>