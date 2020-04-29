<template>
  <v-container>
  </v-container>
</template>

<script>
import { APP_TITLE } from '@/config.js'
export default {
  data: () => ({
    
  }),
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', {
        name: APP_TITLE,
        email: 'Navigation Drawer',
        icon: '/static/assets/Error.png',
        gradecode: 0
      })
      this.$router.push({
        name: 'home'
      })
    }
  },
  mounted () {
    this.logout()
  }
}
</script>

<style scoped>
</style>
