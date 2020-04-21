<template>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
    </v-flex>

    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }" class="ml-2">
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {

  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {

    }
  },
  async mounted () {
  
  }
}
</script>

<style scoped>

</style>
