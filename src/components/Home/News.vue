<template>
  <v-container>
    <v-row 
      class="mb-3"
    >
      <v-col
        v-for="card in cards"
        :key="card.id"
        :lg="3"
        :md="6"
        :sm="6"
        :xs="6"
      >
        <v-card
          shaped
          :loading="card.loading"
          :disabled="card.disabled"
          class="mx-auto"
          max-height="350px"
        >
          <v-img
            class="white--text align-end"
            height="150px"
            :src="card.image"
          >
          </v-img>
          <v-card-title style="white-space: nowrap; overflow: hidden;text-overflow: ellipsis;">{{card.title}}</v-card-title>
          <v-card-subtitle class="text-left">{{card.date}}</v-card-subtitle>
          <v-card-text class="text-left" style="height:50px;overflow: hidden;text-overflow: ellipsis;">
            {{card.desc}}
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              :to="`article/${card.id}`"
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
import news from '@/services/news'
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
  data: () => ({
    cards: [
      { id: 0, title: '[Loading] Loading..', date: '01 Jan 1700', image: '/static/assets/Hello.png', desc: 'Loading...', target: '', loading: 'orange', disabled: true },
      { id: 1, title: '[Loading] Loading..', date: '01 Jan 1700', image: '/static/assets/Hello.png', desc: 'Loading...', target: '', loading: 'orange', disabled: true },
      { id: 2, title: '[Loading] Loading..', date: '01 Jan 1700', image: '/static/assets/Hello.png', desc: 'Loading...', target: '', loading: 'orange', disabled: true },
      { id: 3, title: '[Loading] Loading..', date: '01 Jan 1700', image: '/static/assets/Hello.png', desc: 'Loading...', target: '', loading: 'orange', disabled: true }
    ]
  }),
  async mounted () {
    const latest = await news.getLatest()
    if (latest && latest.data.success) {
      const articles = latest.data.data
      for (let i = 0; i < articles.length && i < 4; ++i) {
        this.$set(this.cards, i, {
          id: articles[i].id, 
          title: articles[i].title, 
          date: news.getDate(articles[i].created_at), 
          image: `/static/assets/${articles[i].category}.png`, 
          desc: articles[i].description, 
          target: '', 
          loading: false, 
          disabled: false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
