<template>
  <div id="app">
    <v-app>
      <page-header />
      <main class="padded">
        <router-view></router-view>
      </main>
      <page-footer />
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: white;
  margin-top: 60px;
}
.danger-alert {
  color: red;
}
.padded {
  padding-top: 50px;
  padding-bottom: 75px;
}
</style>
