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
    <v-pagination
      v-model="page"
      :length="length"
      :page="page"
      @input="setPage"
    ></v-pagination>
  </v-container>
</template>

<script>
import news from '@/services/news'

export default {
  components: {

  },
  computed: {
    cols () {
      const { xl, lg, md, sm } = this.$vuetify.breakpoint
      if (xl || lg) return 4
      else if (md) return 3
      else if (sm) return 2
      return 1
    }
  },
  data: () => ({
    page: 1,
    length: 1,
    cards: []
  }),
  methods: {
    async setPage (page) {
      this.getNews(page)
    },
    async getNews (page) {
      this.cards = []
      const response = await news.getPage(page)
      if (response && response.data.success) {
        const articles = response.data.data
        articles.forEach(article => {
          this.cards.push({
            id: article.id,
            title: article.title,
            date: news.getDate(article.created_at),
            image: `/static/assets/${article.category}.png`,
            desc: article.description,
            target: `article/${article.id}`,
            loading: false,
            disabled: false
          })
        })
      }
    }
  },
  async mounted () {
    const response = await news.getLatest()
    if (response && response.data.success) {
      this.page = response.data.current
      this.length = response.data.last
      this.setPage(this.page)
    }
  }
}
</script>

<style scoped>

</style>
