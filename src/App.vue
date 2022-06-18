<template>
  <div>
    <Nav class="mb-4" />
    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from './components/Layout/Nav.vue'
  export default {
    name: "App",
    components: {Nav},
    data(){
      return {}
    },

  }
</script>
