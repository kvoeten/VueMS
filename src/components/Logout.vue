<template>
  <v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    
  }),
  methods: {
    logout () {
      this.$store.dispatch('logout')
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
