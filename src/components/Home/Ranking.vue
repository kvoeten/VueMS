<template>
<v-parallax src="/static/assets/Background.png">
  <v-container>
    <v-row
        :no-gutters="true"
        class="mb-3"
      >
        <v-col
          height="25vw"
          :lg="6"
          :md="6"
          :sm="6"
          :xs="6"
        >
          <v-img style="position: absolute; left: 0; bottom: 0; overflow:visible;"
              width="470px"
              src="/static/assets/Ranking.png"
            >
          </v-img>
        </v-col>

        <v-col
          height="25vw"
          :lg="6"
          :md="6"
          :sm="6"
          :xs="6"
        >
          
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>

export default {
  components: {

  },
  computed: {
    
  },
  data: () => ({
    
  }),
  async mounted () {
    
  }
}
</script>

<style scoped>
  .v-parallax {
    width: 110vw;
    margin-left: -5vw;
    padding-left: 5vw;
    overflow: visible;
  }
</style>
