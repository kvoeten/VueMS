<template>
  <v-container>
    <news />
    <ranking />
  </v-container>
</template>

<script>
import News from '@/components/Home/News.vue'
import Ranking from '@/components/Home/Ranking.vue'

export default {
  components: {
    News,
    Ranking
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

</style>
