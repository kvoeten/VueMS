<template>
  <v-container style="width:90vw; padding-top: 6vw;">
    <v-row
      class="mb-3"
    >
      <v-col
        v-for="n in 4"
        :key="n"
        :lg="3"
        :md="6"
        :sm="6"
        :xs="6"
      >
        <v-card
          shaped
          class="mx-auto"
          max-height="40vw"
        >
          <v-img
            class="white--text align-end"
            height="150px"
            src="/static/assets/news.png"
          >
          </v-img>

          <v-card-title>Patch Notes V176.2</v-card-title>

          <v-card-subtitle class="text-left">14 March 2020</v-card-subtitle>

          <v-card-text class="text-left">
            <div>Today we published the latest patch notes! Highlights of this patch include: Lotus, Hekaton and new cash items!</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange"
              text
            >
              READ MORE
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
export default {
  components: {

  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ]),
    cols () {
      const { xl, lg, md, sm } = this.$vuetify.breakpoint
      if (xl || lg) return 4
      else if (md) return 3
      else if (sm) return 2
      return 1
    }
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
